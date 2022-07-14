const ApiError = require("../utils/ApiError");
const CatchAsync = require("../utils/CatchAsync");
const { Friendship } = require("../models");
const { friendshipService } = require("../services");
const paginate = require("../utils/paginate.util");

// CRUD User
const getAllFriendshipOfUser = friendshipService.getAllFriendshipOfUser;
const addAFriendForUser = friendshipService.addAFriendForUser;
const deleteAOrManyFriendshipOfUser =
   friendshipService.deleteAOrManyFriendshipOfUser;

module.exports = {
   getAllFriendshipOfUser,
   addAFriendForUser,
   deleteAOrManyFriendshipOfUser,
};
