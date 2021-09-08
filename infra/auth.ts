import * as jwt from 'jsonwebtoken'
import Configs from './configs'

class Auth {
    validate(request, response, next) {
        var token = request.headers['x-access-token']

        if (token) {
            jwt.verify(token, Configs.secret, function (err, decoded) {
                if (err) {
                    return response.status(401).send({
                        success: false,
                        message: 'unauthorized'
                    })
                }
                next()
            })
        }

        return response.status(401).send({
            success: false,
            message: 'unauthorized'
        })
    }
}

export default new Auth()