const ApiError = require("../utils/ApiError");
const CatchAsync = require("../utils/CatchAsync");
const { User } = require("../models");

// CRUD User
const getAllUsers = CatchAsync((req, res, next) => {});

const getUser = CatchAsync((req, res, next) => {});

const updateUser = CatchAsync((req, res, next) => {});

const deleteUser = CatchAsync((req, res, next) => {});

module.exports = { getAllUsers, getUser, updateUser, deleteUser };
