const ApiError = require("../utils/ApiError");
const CatchAsync = require("../utils/CatchAsync");
const { sendMail } = require("./sendMail.service");
const { Post } = require("../models");
const { Comment } = require("../models");

const getAllModel = (Model) =>
    CatchAsync(async (req, res, next) => {
        const data = await Model.find();
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
        const data = await Model.findById(req.params.id);
        if (!data) {
            next(new ApiError(`${Model} not found`, 404));
        }
        res.status(200).json({
            status: "success",
            data,
        });
    });

const createModel = (Model) =>
    CatchAsync(async (req, res, next) => {
        let data;
        if (Model === Post) {
            console.log("run post");
            const files = req.files.photos
            const filenames = (files) ? files.map(file => file.filename) : ""
            const data = await Model.create({
                description: req.body.description,
                shareOf: req.body.shareOf,
                author: req.user._id,
                photos: filenames
            });
        }
        else if (Model === Comment) {
            let isCreate = false;
            if (req.body.parentCmt) {
                const check = await Comment.findById(req.body.parentCmt);
                if (!check)
                    return next(new ApiError(`parentCmt does not exist`, 404));
                else if(check.postID != req.body.postID) 
                    return next(new ApiError(`parentCmt does not math`, 403));
                else
                    isCreate = true;
            }else
                isCreate = true;
            if (isCreate) {
                console.log("run");
                data = await Comment.create({
                content: req.body.content,
                postID: req.body.postID,
                parentCmt: req.body.parentCmt,
                author: req.user._id,
            })
            }            
        } else {
            data = await Model.create(req.body);  
        }
        if (!data) {
            return next(new ApiError(`create fail`, 404));
        } else {
            res.status(200).json({
                status: "success",
                data,
            });
        }
        
    });

const updateModel = (Model) =>
    CatchAsync(async (req, res, next) => {
        let data;
        if (Model == Post) {
            const files = req.files.photos
            const filenames = (files) ? files.map(file => file.filename) : ""
            data = await Model.findById(req.params.id)
            data.description = req.body.description
            if(filenames) {
                data.photos = filenames
            }
            await data.save()
        }
        else if (Model === Comment) {
            if (req.body.postID || req.body.parentCmt)
                return next(new ApiError(`only for updating content field`, 403));
            data = await Model.findByIdAndUpdate(req.params.id, { content: req.body.content });           
        }
        else {
            data = await Model.findByIdAndUpdate(req.params.id, req.body);
        }
        if (!data) {
            next(new ApiError(`create fail`, 404));
        }
        else {

            res.status(200).json({
                status: "success",
                data,
            });
        }
    });

const deleteModel = (Model) =>
    CatchAsync(async (req, res, next) => {
        const data = await Model.findByIdAndDelete(req.params.id);
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
