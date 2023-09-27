const logger = require("../config/logger");
const mongoEnum = require("../enums/mongo-error.enum")

const handleErrorMongo = (error,err) => {
    // MongoDB bad ObjectID
  if (err.name === mongoEnum.CAST) {
   error = new ApiError(msgEnum.CAST_ERROR, codeEnum.NOT_FOUND);
 }

 //MongoDB duplicate value key
 if (err.code === mongoEnum.DUPLICATE) {
   error = new ApiError(msgEnum.DUPLICATE_VALUE, codeEnum.BAD_REQUEST);
 }

 // MongoDB validation failed
 if (err.name === mongoEnum.VALIDATION) {
   const message = Object.values(err.errors).map((value) => value.message);
   error = new ApiError(message, codeEnum.BAD_REQUEST);
 }

 return error;
}

const handleErrorDevelopment = (err, res) => {
   logger.error(err);
   console.log(err);
   res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
   });
};

const handleErrorProduction = (err, res) => {
   if (err.isOperational) {
      res.status(err.statusCode).json({
         status: err.status,
         message: err.message,
      });
   } else {
      res.status(500).json({
         status: "error",
         message: `INTERNAL SERVER ERROR !`,
      });
   }
};

module.exports = {
   handleErrorDevelopment,
   handleErrorProduction,
};
