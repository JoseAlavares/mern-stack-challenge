const assert = require("chai").assert
const UserController = require('../modules/user/user.controller')
const { faker } = require('@faker-js/faker')

const userInstance = new UserController()

describe('User operations', () => {
    it('Test the function create user', async () => {
        const userFake = {
            name: faker.internet.userName(),
            lastName: faker.internet.userName(),
            secondLastName: faker.internet.userName(),
            email: `${faker.internet.userName()}@gmail.com`,
            password: '12345'
        }

        const newUser = await userInstance.create(userFake)
        assert.isObject(newUser, 'is a user object')
        assert.hasAllKeys(newUser, ['id', 'name', 'lastName', 'secondLastName', 'email'])
        delete userFake.password
        delete newUser.id
        assert.deepEqual(userFake, newUser)
    })

    it('Test the function update', async () => {
        const userFake = {
            name: faker.internet.userName(),
            lastName: faker.internet.userName(),
            secondLastName: faker.internet.userName(),
            email: `${faker.internet.userName()}@gmail.com`,
        }
        const newUser = await userInstance.create(userFake)
        const updatePayload = {
            id: newUser.id,
            name: faker.internet.userName(),
            email: `${faker.internet.userName()}@gmail.com`,
            lastName: faker.internet.userName(),
            secondLastName: faker.internet.userName()
        }
        const updatedUser = await userInstance.update(updatePayload)
        assert.deepEqual(updatedUser, [1])
    })

    it('Test the function getById', async () => {
        const id = 1
        const user = await userInstance.getById(id)
        assert.isObject(user.dataValues)
        assert.hasAllKeys(user.dataValues, ['id', 'name', 'last_name', 'second_last_name', 'email'])
        for (let [key, value] of Object.entries(user.dataValues)) {
            if(key == 'id') assert.isNumber(value, 'the id is numeric')
            else assert.isString(value, `The key: ${key} is string`)
        }
    })

    it('Test the function delete', async () => {
        const userFake = {
            name: faker.internet.userName(),
            lastName: faker.internet.userName(),
            secondLastName: faker.internet.userName(),
            email: `${faker.internet.userName()}@gmail.com`,
        }
        const newUser = await userInstance.create(userFake)
        const id = newUser.id
        const deletedUser =await userInstance.delete(id)
        assert.isArray(deletedUser)
    })

    it('Test the function getUsers', async () => {
        const users = await userInstance.getUsers()
        // console.log(users)
        assert.isArray(users)
        for (let user of users) {
            assert.hasAllKeys(user.dataValues, ['id', 'name', 'last_name', 'second_last_name', 'email'])
            for (let [key, value] of Object.entries(user.dataValues)) {
                if(key == 'id') assert.isNumber(value, 'the id is numeric')
                else assert.isString(value, `The key: ${key} is string`)
            }
        }
    })
})