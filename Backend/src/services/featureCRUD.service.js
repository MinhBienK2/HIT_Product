const ApiError = require("../utils/ApiError");
const CatchAsync = require("../utils/CatchAsync");
const { sendMail } = require("./sendMail.service");

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
        const data = await Model.find(req.params.id);
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
        const data = await Model.create(req.body);
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
        const data = await Model.findByIdAndUpdate(req.params.id, req.body);
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
