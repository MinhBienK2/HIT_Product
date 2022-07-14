const ApiError = require("../utils/ApiError");
const CatchAsync = require("../utils/CatchAsync");
const { sendMail } = require("./sendMail.service");
const paginate = require("../utils/paginate.util");
const { User, Friendship, Message } = require("../models");

const getAllFriendshipOfUser = CatchAsync(async (req, res, next) => {
   // const data = await Friendship.find();
   let datas;
   datas = new paginate(
      Friendship.findOne({
         userId: req.user.id,
      }),
      req.query
   );
   // paginate
   datas.search().filter().sort().select().pagination().populate();
   const data = await datas.query;
   //respone
   if (!data) {
      next(new ApiError(`${Friendship} not found`, 404));
   }
   res.status(200).json({
      status: "success",
      listFriend: data[0].friends,
   });
});

const addAFriendForUser = CatchAsync(async (req, res, next) => {
   let data;
   // update when add friend
   const check = await Friendship.find(
      {
         userId: req.user.id,
      },
      {
         friends: {
            $elemMatch: {
               friendId: req.params.friendId,
            },
         },
      }
   );
   // console.log(check[0].friends.length !== 0);
   if (check[0].friends.length !== 0) {
      return next(new ApiError("userId has exists !"));
   }
   data = await Friendship.update(
      {
         userId: req.user.id,
      },
      {
         $push: {
            friends: {
               friendId: req.params.friendId,
            },
         },
      }
   );
   //respone
   if (!data) {
      next(new ApiError(`create fail`, 404));
   }
   res.status(200).json({
      status: "success",
      data,
   });
});

const deleteAOrManyFriendshipOfUser = CatchAsync(async (req, res, next) => {
   let data;
   data = await Friendship.update(
      { userId: req.user.id },
      {
         $pull: {
            friends: {
               friendId: req.params.friendId,
            },
         },
      }
   );
   // return
   if (!data) {
      next(new ApiError(`delete ${Friendship} fail`, 404));
   }
   res.status(200).json({
      status: "success",
   });
});

module.exports = {
   getAllFriendshipOfUser,
   addAFriendForUser,
   deleteAOrManyFriendshipOfUser,
};
