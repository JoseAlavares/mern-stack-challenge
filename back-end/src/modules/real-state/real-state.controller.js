const models = require('../../models')
const { NotExistsRecord, ErrorService } = require('../../classes/error_exceptions')
const { isEmpty } = require('lodash')
const { logger } = require('../../middlewares/logger')

module.exports = class RealStateController {
    constructor() {
        this.tableName = 'real_state_list'
    }

    loggerMessages(methodName, detail) {
        return `Error in the class RealStateController in the method ${methodName}, ${detail}`
    }

    async getRealStateRecords() {
        const realStates = await models[this.tableName].findAll({
            where: { active: true },
            attributes: [
                'id', 'description', 'field', 'construction', 'address', 'contact_phone',
                'contact_mail', 'bathrooms', 'bedrooms', 'parking_lots'
            ]
        })

        if (isEmpty(realStates)) throw new NotExistsRecord('RealStateController')

        return realStates
    }

    async update({ id, description, field, construction, address, contactPhone, contactMail, bathrooms, bedrooms, parkingLots }) {
        try {
            const result = await models[this.tableName].update({
                    description, field, construction, address, contact_phone: contactPhone,
                    contact_mail: contactMail , bathrooms, bedrooms, parking_lots: parkingLots
            },
            { where: { id }})[0]

            if (result == 1) {
                return true
            }

            return false
        } catch (error) {
            logger.log('error', error)
            logger.log('error', this.loggerMessages('update', `couldn't update the data for the ${this.tableName}: ${email}`))
            throw new ErrorService('RealStateController', email)
        }
    }

    async delete({ id }) {
        console.log('id', id)
        try {
            await models[this.tableName].update(
                { active: false },
                { where: { id } }
            )
        } catch (error) {
            console.error(error)
            logger.log('error', this.loggerMessages('delete', `couldn't disable the real state: ${id}`))
            throw new ErrorService('RealStateController', id)
        }
    }

    async create({ description, field, construction, address, contactPhone, contactMail, bathrooms, bedrooms, parkingLots }) {
        try {
            const realRealState = await models[this.tableName].create({
                description, field, construction, address, contact_phone: contactPhone,
                contact_mail: contactMail, bathrooms, bedrooms, parking_lots: parkingLots
            })
            return {
                id: realRealState.id, description: realRealState.description,
                field: realRealState.field, construction: realRealState.construction,
                address: realRealState.address, contact_phone: realRealState.contact_phone,
                contact_mail: realRealState.contact_mail, bathrooms: realRealState.bathrooms,
                bedrooms: realRealState.bedrooms, parking_lots: realRealState.parking_lots
            }
        } catch (error) {
            logger.log('error', error)
            logger.log('error', this.loggerMessages('create', 'couldn\'t create a real state record'))
            throw new ErrorService('RealStateController', data.field)
        }
    }

    async getById(id) {
        const realState = await models[this.tableName].findOne({
            where: { id },
            attributes: { exclude: ['createdAt', 'updatedAt', 'active'] }
        })

        if (isEmpty(realState)) throw new NotExistsRecord('RealStateController', id)

        return realState
    }
}