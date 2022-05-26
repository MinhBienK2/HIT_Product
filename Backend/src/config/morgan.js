const morgan = require("morgan");
const logger = require("./logger");

let NODE_ENV = process.env.NODE_ENV;

morgan.token("message", function (req, res) {
    return res.locals.errorMessage || "";
});

const getIpFormat = () => {
    NODE_ENV === "production" ? ":remote-addr - " : " ";
};
const successResponseFormat = `${getIpFormat()} :method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()} :method :url :status - :response-time ms - message: :message`;

const successHandle = morgan(successResponseFormat, {
    skip: function (req, res) {
        return res.statusCode >= 400;
    },
    tream: { write: (message) => logger.info(message.trim()) },
});

const errorHandle = morgan(errorResponseFormat, {
    skip: function (req, res) {
        return res.statusCode <= 400;
    },
    tream: { write: (message) => logger.error(message.trim()) },
});

module.exports = {
    successHandle,
    errorHandle,
};
