const ApiError = require("../utils/ApiError");
const CatchAsync = require("../utils/CatchAsync");
const { sendMail } = require("./sendMail.service");
const paginate = require("../utils/paginate.util");
const {
    User,
    Friendship,
    Message,
    Post,
    Comment,
    Reaction,
} = require("../models");

const getAllModel = (Model) =>
    CatchAsync(async (req, res, next) => {
        // const data = await Model.find();
        let datas;
        if (Model === Message) {
            datas = new paginate(
                Model.find({
                    userId: req.user.id,
                }),
                req.query
            );
        } else {
            datas = new paginate(Model.find(), req.query);
        }
        // paginate
        datas.search().filter().sort().select().pagination().populate();
        const data = await datas.query;
        // console.log(data[0]);
        //respone
        if (!data) {
            next(new ApiError(`${Model} not found`, 404));
        }
        res.status(200).json({
            status: "success",
            data,
        });
    });

const getModel = (Model) =>
    CatchAsync(async (req, res, next) => {
        const data = await Model.findOne({ _id: req.params.id });
        if (!data) {
            next(new ApiError(`${Model} not found`, 404));
        }
        //respone
        res.status(200).json({
            status: "success",
            data,
        });
    });

const createModel = (Model) =>
    CatchAsync(async (req, res, next) => {
        let data;
        if (Model === Reaction) {
            if (!req.body.forPost && !req.body.forCmt)
                return next(new ApiError(`what reaction for`, 403));
            const check = await Reaction.findOne({
                author: req.user._id,
                forPost: req.body.forPost,
                forCmt: req.body.forCmt,
            });
            if (check) return next(new ApiError(`reaction exists`, 403));
            data = await Reaction.create({
                author: req.user._id,
                forPost: req.body.forPost,
                forCmt: req.body.forCmt,
                status: req.body.status,
            });
        } else {
            data = await Model.create(req.body);
        }
        // data = await Model.create(req.body);
        if (!data) {
            next(new ApiError(`create fail`, 404));
        }
        //create friendship
        if (Model === User) {
            const friend = await Friendship.create({
                userId: data.id,
            });
        }

        //respone
        res.status(200).json({
            status: "success",
            data,
        });
    });

const updateModel = (Model) =>
    CatchAsync(async (req, res, next) => {
        let data;
        if (Model === Comment) {
            if (req.body.postID || req.body.parentCmt)
                return next(
                    new ApiError(`only for updating content field`, 403)
                );
            data = await Model.findByIdAndUpdate(req.params.id, {
                content: req.body.content,
            });
        } else if (Model === Reaction) {
            if (req.body.forPost || req.body.forCmt)
                return next(
                    new ApiError(`only for updating status field`, 403)
                );
            data = await Model.findById(req.params.id);
            data.status = req.body.status;
            await data.save();
        } else {
            data = await Model.findByIdAndUpdate(req.params.id, req.body);
        }
        // data = await Model.findByIdAndUpdate(req.params.id, req.body);
        //respone
        if (!data) {
            next(new ApiError(`update fail`, 404));
        }
        res.status(200).json({
            status: "success",
            data,
        });
    });

const deleteModel = (Model) =>
    CatchAsync(async (req, res, next) => {
        let data;
        data = await Model.findByIdAndDelete(req.params.id);
        // return
        if (!data) {
            next(new ApiError(`delete ${Model} fail`, 404));
        }
        res.status(200).json({
            status: "success",
        });
    });

module.exports = {
    getAllModel,
    getModel,
    createModel,
    updateModel,
    deleteModel,
};
