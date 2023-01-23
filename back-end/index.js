require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const middlewares = require('./src/middlewares/access-token')

const PORT = process.env.PORT

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

//Modules
const user = require('./src/modules/user/user.network')
const realState = require('./src/modules/real-state/real-state.network')


app.use('/api/v1/user', [middlewares.isLoggedIn], user)
app.use('/api/v1/real-state', [middlewares.isLoggedIn], realState)

app.get('/api/v1', (req, resp) => {
    return resp.status(200).json({
        timestamp: new Date().toISOString(),
        status: 200,
        message: 'successfull'
    })
})

app.listen(PORT, () => {
	console.log(`Server start in the port: ${PORT}`)
})
