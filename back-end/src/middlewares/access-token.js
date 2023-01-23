const utils = require("../utils/utils.functions")
const { isEmpty } = require('lodash')

const middlewares = {
	isLoggedIn : async (request, response, next) =>{
		const publicServices = [
			"/auth/login"
		]

		if (!isEmpty(publicServices.find(service => service === request.path))) {
			return next()
		}

		const token = request.headers['authorization'] || ''

		if(!token) {
			return utils.responseNetwork(
				response,
				true,
				401,
				"Acceso no autorizado"
			)
		}

		let isValid = false
		isValid = await utils.verifyToken(token)

		if(isValid) {
			return next()
		}

		return utils.responseNetwork(
			response,
			true,
			401,
			"Acceso no autorizado"
		)
	}
}

module.exports = middlewares