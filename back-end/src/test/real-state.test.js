const assert = require("chai").assert
const RealStateController = require('../modules/real-state/real-state.controller')
const { faker } = require('@faker-js/faker')

const realStateInstance = new RealStateController()

const randomNumber = (n) => Math.random() * n

const realStateRandom = () => ({
    description: faker.lorem.paragraph(),
    field: faker.datatype.number({ min: 100, max: 99999 }),
    construction: faker.datatype.number({ min: 100, max: 1000 }),
    address: `
        ${faker.address.city()}, ${faker.address.state()}, ${faker.address.country()}
        ${faker.address.streetAddress()}
        ${faker.address.zipCode()}
    `,
    contact_phone: faker.phone.number(),
    contact_mail: faker.internet.email(),
    bathrooms: faker.datatype.number({ min: 1, max: 5 }),
    bedrooms: faker.datatype.number({ min: 1, max: 10 }),
    parking_lots: faker.datatype.number({ min: 1, max: 5 }),
})

describe('Real state operations', () => {
    it('Test the function create real state', async () => {
        const payloadRealState = realStateRandom()
        const newRealState = await realStateInstance.create(payloadRealState)
        assert.isObject(newRealState, 'realState is a  object')
        assert.hasAllKeys(newRealState, [
            'id', 'description', 'field', 'construction', 'address', 'contact_phone',
            'contact_mail', 'bathrooms', 'bedrooms', 'parking_lots'
        ])
        delete newRealState.id
        assert.deepEqual(payloadRealState, newRealState)
    })

    it('Test the function update', async () => {
        const newrealState = await realStateInstance.create(realStateRandom())
        const updatePayload = {
            id: newrealState.id,
            ...realStateRandom()
        }
        const updatedrealState = await realStateInstance.update(updatePayload)
        assert.equal(updatedrealState, true)
    })

    it('Test the function getById', async () => {
        const id = 1
        const realState = await realStateInstance.getById(id)
        assert.isObject(realState.dataValues)
        assert.hasAllKeys(realState.dataValues, ['id', 'name', 'last_name', 'second_last_name', 'email'])

        for (let [key, value] of Object.entries(realState.dataValues)) {
            if(key == 'id') assert.isNumber(value, 'the id is numeric')
            else assert.isString(value, `The key: ${key} is string`)
        }
    })

    it('Test the function delete', async () => {
        const newrealState = await realStateInstance.create(realStateRandom())
        const id = newrealState.id
        const deletedrealState =await realStateInstance.delete(id)
        assert.isArray(deletedrealState)
    })

    it('Test the function getrealStates', async () => {
        const realStates = await realStateInstance.getRealStateRecords()
        assert.isArray(realStates)

        for (let realState of realStates) {
            assert.hasAllKeys(realState, [
                'description', 'field', 'construction', 'address', 'contact_phone',
                'contact_mail', 'bathrooms', 'bedrooms', 'parking_lots'
            ])

            for (let [key, value] of Object.entries(realState.dataValues)) {
                if(key == 'id') assert.isNumber(value, 'the id is numeric')
                else assert.isString(value, `The key: ${key} is string`)
            }
        }
    })
})