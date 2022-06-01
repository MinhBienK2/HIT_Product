const httpStatus = require("http-status");

const { errorController } = require("../controllers");

const handleError = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
    error.stack = err.stack;
    error.statusCode = err.statusCode || 500;
    error.status = err.status || "error";
    res.locals.errorMessage = err.message;
    if (process.env.NODE_ENV === "development")
        errorController.handleErrorDevelopment(error, res);
    else if (process.env.NODE_ENV === "production") {
        errorController.handleErrorProduction(error, res);
    }
};

module.exports = handleError;
