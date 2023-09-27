const commonSchemas = require("./commonSchemas");
const userSchemas = require("./userSchemas");
const authSchemas = require("./authSchemas");

module.exports = {
  components: {
    schemas: {
      ...commonSchemas,
      ...userSchemas,
      ...authSchemas,
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};
