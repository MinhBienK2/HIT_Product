const login = require('./login');
const register = require('./register');
const logout  = require("./logout")

module.exports = {
    "/login" : {
        ...login
    },
    "/signup" : {
        ...register
    },
    "/logout" : {
        ...logout
    }
}