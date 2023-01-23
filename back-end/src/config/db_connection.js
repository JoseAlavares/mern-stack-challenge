const { Sequelize, DataTypes } = require('sequelize');
const { logger } = require('../middlewares/logger')
require('dotenv').config()

/**
 * @author Jose Francisco Alvarez Valdez<alvaresvaldes89@gmail.com>
 * @description Function to return a sequelize instance connection
 * @date 2023-01-10
 * @returns object
 */
const connectionDB = () => {
    try {
        return  new Sequelize(
            process.env.DB_DB,
            process.env.DB_USER,
            process.env.DB_PASSWORD, {
                dialect: process.env.DB_DIALECT,
                host: process.env.DB_HOST,
                logging: false
        })
    } catch (error) {
        const msgError = 'Error in the connection with the database server'
        logger.log('error', error.message)
        logger.log('error', msgError)
        throw new Error(msgError)
    }
}

module.exports = { connectionDB }