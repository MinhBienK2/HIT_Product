const ApiError = require("../utils/ApiError");
const CatchAsync = require("../utils/CatchAsync");
const { Friendship } = require("../models");
const { friendshipService } = require("../services");
const paginate = require("../utils/paginate.util");

// CRUD User
const getAllFriendshipOfUser = friendshipService.getAllFriendshipOfUser;
const createFriendship = friendshipService.createFriendship;
const confirmNewFriendRequest = friendshipService.confirmNewFriendRequest;
const getAllListConfirmFriendRequest =
    friendshipService.getAllListConfirmFriendRequest;
const deleteFriend = friendshipService.deleteFriend;

module.exports = {
    createFriendship,
    confirmNewFriendRequest,
    getAllFriendshipOfUser,
    getAllListConfirmFriendRequest,
    deleteFriend,
};

// const ApiError = require("../utils/ApiError");
// const CatchAsync = require("../utils/CatchAsync");
// const { Friendship } = require("../models");
// const { friendshipService } = require("../services");
// const paginate = require("../utils/paginate.util");

// // CRUD User
// const getAllFriendshipOfUser = friendshipService.getAllFriendshipOfUser;
// const addAFriendForUser = friendshipService.addAFriendForUser;

// module.exports = {
//    getAllFriendshipOfUser,
//    addAFriendForUser,
//    deleteAOrManyFriendshipOfUser,
// };
