const apiGeneralInfo = require("./apiGeneralInfo");
const servers = require("./servers");
const tags = require("./tags");
const components = require("./components");
const users = require("./users");
const auth = require("./auth");

module.exports = {
  ...apiGeneralInfo,
  ...servers,
  ...tags,
  ...components,
  paths: {
    ...auth,
    ...users,
  },
};
