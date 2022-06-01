const ApiError = require("../utils/ApiError");
const CatchAsync = require("../utils/CatchAsync");
const { User } = require("../models");
const { featureCRUDService } = require("../services");

// CRUD User
const getAllUsers = featureCRUDService.getAllModel(User);
const getUser = featureCRUDService.getModel(User);
const createUser = featureCRUDService.createModel(User);
const updateUser = featureCRUDService.updateModel(User);
const deleteUser = featureCRUDService.deleteModel(User);

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser };
