const express = require("express")
const RealStateController = require("./real-state.controller")
const router = express.Router()
const { createRealStateValidation, updateRealStateValidation } = require('../../validators/real-state-validations')
const { NotExistsRecord, ErrorService } = require('../../classes/error_exceptions')
const { logger } = require("../../middlewares/logger")

const realStateInstance = new RealStateController()

/**
 * @author José Francisco AlvarezValdez<alvaresvaldes89@outlook.es>
 * @description Service to get all real states from the db
 * @param req <Object> contains data body from a form
 * @param resp <Object> response of the server
 * @returns resp <JSON> return data of the server
 * @date 2020-07-15
 */
router.get("/", async (req, resp) => {
    try {
        const realStates = await realStateInstance.getRealStateRecords()
        return resp.status(200).json(realStates)
    } catch(error) {
        if (error instanceof NotExistsRecord)
            return resp.status(404).json({ message: 'Not exists real states yet' })
        // console.error(error)

        return resp.status(500).json({ message: 'Internal server error' })
    }
})

/**
 * @author José Francisco AlvarezValdez<alvaresvaldes89@outlook.es>
 * @description Service to create new real states
 * @param req <Object> contains data body from a form
 * @param resp <Object> response of the server
 * @returns resp <JSON> return data of the server
 * @date 2020-07-15
 */
router.post("/", async(req, resp) => {
    const isValid = createRealStateValidation(req.body)

    if (isValid?.errors) {
        // logging.log('warn', 'errors in the payload')
        // logging.log('warn', errors)
        return resp.status(400).json({ details: isValid.errors })
    }

    try {
        const newRealState = await realStateInstance.create(req.body)
        return resp.status(201).json({ id: newRealState.id, email: newRealState.address })
    } catch (error) {
        // logger.log('error', `Error in the service to create a new user`)
        return resp.status(500).json({ message: 'Internal server error' })
    }
})

/**
 * @author José Francisco AlvarezValdez<alvaresvaldes89@outlook.es>
 * @description Service to update real state data
 * @param req <Object> contains data body from a form
 * @param resp <Object> response of the server
 * @returns resp <JSON> return data of the server
 * @date 2020-07-15
 */
router.put("/:id", async (req, resp) => {
    if (!req.params.id) {
        return resp.status(400).json({ message: 'Bad request' })
    }

    const isValid = updateRealStateValidation(req.body)

    if (isValid?.errors) {
        logger.log('error', isValid.errors)
        return resp.status(400).json({ message: 'Bad request' })
    }

    try {
        const payload = { id: req.params.id, ...req.body }
        await realStateInstance.update(payload)
        return resp.status(200).json({ message: 'OK' })
    } catch (error) {
        logger.log('error', error)
        logger.log('error', `Error in the service to create a new real state`)
        return resp.status(500).json({ message: 'Internal server error' })
    }
})

/**
 * @author José Francisco AlvarezValdez<alvaresvaldes89@outlook.es>
 * @description Service to delete a real state
 * @param req <Object> contains data body from a form
 * @param resp <Object> response of the server
 * @returns resp <JSON> return data of the server
 * @date 2020-07-15
 */
router.delete("/:id", async (req, resp) => {
    if (!req.params.id) {
        return resp.status(400).json({ message: 'Internal server error'})
    }

    try {
        await realStateInstance.delete(req.params.id)
        return resp.status(200).json({ message: 'OK' })
    } catch (error) {
        // logger.log('error', `Error in the service to create a new user`)
        return resp.status(500).json({ message: 'Internal server error' })
    }
})

/**
 * @author José Francisco AlvarezValdez<alvaresvaldes89@outlook.es>
 * @description Service to get all information for a real state
 * @param req <Object> contains data body from a form
 * @param resp <Object> response of the server
 * @returns resp <JSON> return data of the server
 * @date 2020-07-15
 */
router.get("/:id", async (req, resp) => {
    if (!req.params.id) {
        return resp.status(400).json({ message: 'Internal server error'})
    }

    try {
        const realState = await realStateInstance.getById(req.params.id)
        return resp.status(200).json(realState)
    } catch (error) {
        if (error instanceof NotExistsRecord)
            return resp.status(404).json({ message: 'Not exists the user' })

        // logger.log('error', `Error in the service to create a new user`)
        return resp.status(500).json({ message: 'Internal server error' })
    }
})

module.exports = router