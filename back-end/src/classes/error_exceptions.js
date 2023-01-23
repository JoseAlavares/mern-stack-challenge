class NotExistsRecord extends Error {
    constructor(className, reference = '') {
        super(`Not exists the record with ${reference} in the class: ${className}`)
        this.message = `Not exists the record with ${reference} in the class: ${className}`
        this.name = 'NotExistsRecord'
    }
}

class InvalidPasswords extends Error {
    constructor(className, reference = '') {
        super(`Invalid password for the user: ${reference} in the class: ${className}`)
        this.message = `Invalid password for the user: ${reference} in the class: ${className}`
        this.name = 'InvalidPasswords'
    }
}

class ErrorService extends Error {
    constructor(className, reference = '') {
        super(`Internal server error in the class: ${className}`)
        this.message = `Internal server error in the class: ${className}`
        this.name = 'ErrorService'
    }
}

module.exports = {
    NotExistsRecord,
    InvalidPasswords,
    ErrorService
}