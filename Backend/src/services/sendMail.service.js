const nodemailer = require("nodemailer");
const logger = require("../config/logger");

const sendMail = async (options) => {
    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_POST,
        auth: {
            user: process.env.SMTP_AUTH_USER,
            pass: process.env.SMTP_AUTH_PASS,
        },
        // host: "smtp.gmail.com",
        // port: 465,
        // secure: true,
        // service: "gmail",
        // auth: {
        //     user: `phamminhbien3333@gmail.com`,
        //     pass: `phamminhbien123`,
        // },
        pool: true,
        maxConnections: 1,
        rateDelta: 20000,
        rateLimit: 5,
    });
    // send mail with defined transport object
    const info = await transport.sendMail({
        from: options.from, // sender address
        // from: `phamminhbien3333@gmail.com`, // sender address
        to: options.to, // list of receivers
        subject: options.subject, // Subject line
        text: options.text, // plain text body
        html: options.html, // html body
    });
    return info;
};

module.exports = {
    sendMail,
};
