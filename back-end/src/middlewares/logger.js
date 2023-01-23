const winston = require('winston')

const logger = winston.createLogger({
    format: winston.format.json(),
    transports: [
        new winston.transports.Console
    ],
})

logger.add(new winston.transports.Console({
    format: winston.format.simple(),
}))

module.exports = { logger }