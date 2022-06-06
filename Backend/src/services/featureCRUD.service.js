const ApiError = require("../utils/ApiError");
const CatchAsync = require("../utils/CatchAsync");
const { sendMail } = require("./sendMail.service");
const { Post } = require("../models");

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
            const files = req.files.photos
            const filenames = (files) ? files.map(file => file.filename) : ""
            data = await Model.create({
                description: req.body.description,
                shareOf: req.body.shareOf,
                author: req.user._id,
                photos: filenames
            });
        }
        else {
            console.log(req.body);
            data = await Model.create(req.body);
        }
        if (!data) {
            next(new ApiError(`create fail`, 404));
        }
        res.status(200).json({
            status: "success",
            data,
        });
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
        else {
            data = await Model.findByIdAndUpdate(req.params.id, req.body);
        }
        if (!data) {
            next(new ApiError(`create fail`, 404));
        }
        res.status(200).json({
            status: "success",
            data,
        });
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
