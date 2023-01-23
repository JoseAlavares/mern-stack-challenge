const express = require("express")
const UserController = require("./user.controller")
const router = express.Router()
const middlewares = require("../../middlewares/access-token")
const utils = require("../../utils/utils.functions")
const { responseNetwork } = require("../../utils/utils.functions")
const { createUserValidation, updateUserValidation } = require('../../validators/user-validations')
const { NotExistsRecord, InvalidPasswords, ErrorService } = require('../../classes/error_exceptions')

const userInstance = new UserController()
/**
 * @author José Francisco AlvarezValdez<alvaresvaldes89@outlook.es>
 * @description Login service for users
 * @param req <Object> contains data body from a form
 * @param resp <Object> response of the server
 * @returns resp <JSON> return data of the server
 * @date 2020-07-15
 */
router.post("/auth/login", async (req, resp) => {
    if (!req.body.user || !req.body.password) {
        return resp.status(400).json({ message: 'Bad request' })
    }

    const { user, password } = req.body
    try {
        const userLogin = await userInstance.signIn({ user, password })
        return resp.status(200).json(userLogin)
    } catch(err) {
        if (err instanceof NotExistsRecord || err instanceof InvalidPasswords)
            return resp.status(404).json({ message: 'Not exists the user' })
        // logger.log('error', `Error in the login service network interface`)
        // logger.log('error', err)
        return resp.status(500).json({ message: 'Internal server error' })
    }
})

/**
 * @author José Francisco AlvarezValdez<alvaresvaldes89@outlook.es>
 * @description Service to get all users from the db
 * @param req <Object> contains data body from a form
 * @param resp <Object> response of the server
 * @returns resp <JSON> return data of the server
 * @date 2020-07-15
 */
router.get("/", async (req, resp) => {
    try {
        const users = await userInstance.getUsers()
        return utils.responseNetwork(resp, false, 200, "successfull", users)
    } catch(error) {
        if (error instanceof NotExistsRecord)
            return resp.status(404).json({ message: 'Not exists users yet' })
        // console.error(error)

        return utils.responseNetwork(resp, true, 500, "error")
    }
})

/**
 * @author José Francisco AlvarezValdez<alvaresvaldes89@outlook.es>
 * @description Service to create new users
 * @param req <Object> contains data body from a form
 * @param resp <Object> response of the server
 * @returns resp <JSON> return data of the server
 * @date 2020-07-15
 */
router.post("/", async(req, resp) => {
    const isValid = createUserValidation(req.body)

    if (isValid?.errors) {
        // logging.log('warn', 'errors in the payload')
        // logging.log('warn', errors)
        return resp.status(400).json({ details: isValid.errors })
    }

    try {
        const { name, lastName, secondLastName, email, password } = req.body
        const newUser = await userInstance.create({
            name,
            lastName,
            secondLastName,
            email,
            password
        })

        return resp.status(201).json({ id: newUser.id, email: newUser.email })
    } catch (error) {
        // logger.log('error', `Error in the service to create a new user`)
        return resp.status(500).json({ message: 'Internal server error' })
    }
})

/**
 * @author José Francisco AlvarezValdez<alvaresvaldes89@outlook.es>
 * @description Service to update user data
 * @param req <Object> contains data body from a form
 * @param resp <Object> response of the server
 * @returns resp <JSON> return data of the server
 * @date 2020-07-15
 */
router.put("/", async (req, resp) => {
    const isValid = updateUserValidation(req.body)

    if (isValid?.errors) {
        return resp.status(400).message({ message: 'Bad request' })
    }

    try {
        const payload = req.body
        await userInstance.update(payload)
        return resp.status(200).json({ message: 'OK' })
    } catch (error) {
        // logger.log('error', `Error in the service to create a new user`)
        return resp.status(500).json({ message: 'Internal server error' })
    }
})

/**
 * @author José Francisco AlvarezValdez<alvaresvaldes89@outlook.es>
 * @description Service to delete a user account
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
        await userInstance.delete(req.params.id)
        return resp.status(200).json({ message: 'OK' })
    } catch (error) {
        // logger.log('error', `Error in the service to create a new user`)
        return resp.status(500).json({ message: 'Internal server error' })
    }
})

/**
 * @author José Francisco AlvarezValdez<alvaresvaldes89@outlook.es>
 * @description Service to get all information by a user
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
        const user = await userInstance.getById(req.params.id)
        return resp.status(200).json(user)
    } catch (error) {
        if (error instanceof NotExistsRecord)
            return resp.status(404).json({ message: 'Not exists the user' })

        // logger.log('error', `Error in the service to create a new user`)
        return resp.status(500).json({ message: 'Internal server error' })
    }
})

module.exports = router