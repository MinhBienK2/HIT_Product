const getUser = require('./getUser')

module.exports = {
    "/api/v1/users/{id}" : {
        ...getUser
    }
}