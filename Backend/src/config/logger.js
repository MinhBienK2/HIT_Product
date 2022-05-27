const winston = require("winston");

let process_env_NODEENV = process.env.NODE_ENV;

const enumerateErrorFormat = winston.format((info) => {
    if (info instanceof Error) {
        Object.assign(info, { message: info.stack });
    }
    return info;
});

const logger = winston.createLogger({
    enumerateErrorFormat,
    level: (process_env_NODEENV = "development" ? "debug" : "info"),
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
          }),
        (process_env_NODEENV = "development"
            ? winston.format.colorize()
            : winston.format.uncolorize()),
        winston.format.splat(),
        winston.format.printf(({ level, message }) => `${level} : ${message}`)
    ),
    // defaultMeta: { service: "user-service" },
    transports: [
        new winston.transports.Console({
            // level: "error",
            stderrLevels: ["error"],
        }),
        // new winston.transports.File({ filename: "error.log", level: "error" }),
        // new winston.transports.File({ filename: "combined.log" }),
    ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
// if (process_env_NODEENV !== "production") {
//     logger.add(
//         new winston.transports.Console({
//             format: winston.format.simple(),
//         })
//     );
// }

module.exports = logger;
