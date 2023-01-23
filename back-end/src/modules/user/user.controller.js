const models = require('../../models')
const utils = require("../../utils/utils.functions")
const { NotExistsRecord, InvalidPasswords, ErrorService } = require('../../classes/error_exceptions')
const { isEmpty } = require('lodash')
const { logger } = require('../../middlewares/logger')

module.exports = class UserController {
    static '@noCallThru' = true

    constructor() {
        this.tableName = 'user'
    }

    loggerMessages(methodName, detail) {
        return `Error in the class UserController in the method ${methodName}, ${detail}`
    }

    async signIn({ user, password }) {
        const _user_ = await models[this.tableName].findOne({
            where: { email: user },
            attributes: ['id', 'name', 'last_name', 'second_last_name', 'email', 'password']
        })

        if (isEmpty(_user_))
            throw new NotExistsRecord('UserModel', user)
        if (!utils.validatePassword(password, _user_.password))
            throw new InvalidPasswords('UserController', user)

        delete _user_.password
        const token = utils.generateToken(_user_.id, _user_.email)
        return {
            id: _user_.id, name: _user_.name, lastName: _user_.last_name,
            secondLastName: _user_.second_last_name, email: _user_.email,
            token
        }
    }

    async getUsers() {
        const users = await models[this.tableName].findAll({
            where: { active: true },
            attributes: ['id', 'name', 'last_name', 'second_last_name', 'email']
        })

        if (isEmpty(users)) throw new NotExistsRecord('UserController')

        return users
    }

    async signUp({ name, last_name, second_last_name, email, password }) {
        try {
            const newUser = await models[this.tableName].create({ name, last_name, second_last_name, email, password })
            return newUser
        } catch(error) {
            logger.log('error', this.loggerMessages('signUp', `could get users: ${user}`))
            throw new ErrorService('UserController', email)
        }
    }

    async update({ id, name, last_name, second_last_name, email, password }) {
        try {
            return await models[this.tableName].update(
                { name, last_name, second_last_name, email, password },
                { where: { id }}
            )
        } catch (error) {
            logger.log('error', this.loggerMessages('update', `couldn't update the data for the user: ${email}`))
            throw new ErrorService('UserController', email)
        }
    }

    async delete(id) {
        try {
            return await models[this.tableName].update(
                { active: false },
                { where: { id } }
            )
        } catch (error) {
            logger.log('error', this.loggerMessages('delete', `couldn't disable the user: ${email}`))
            throw new ErrorService('UserController', email)
        }
    }

    async create({ name, lastName, secondLastName, email, password }) {
        try {
            const hashPassword = utils.generatePassword(password)
            const user = await models[this.tableName].create({
                name, last_name: lastName,
                second_last_name: secondLastName,
                email,
                password: hashPassword
            })
            return {
                id: user.id, name: user.name, lastName: user.last_name,
                secondLastName: user.second_last_name, email: user.email
            }
        } catch (error) {
            logger.log('error', 'Error in the UserController method create, couldn\'t create a user record')
            throw new ErrorService('UserController', email)
        }
    }

    async getById(id) {
        const user = await models[this.tableName].findOne({
            where: { id, active: true },
            attributes: ['id', 'name', 'last_name', 'second_last_name', 'email']
        })

        // if (isEmpty(user)) throw new NotExistsRecord('UserController', id)
        if (isEmpty(user)) throw new Error('Not exists the user')

        return user
    }
}