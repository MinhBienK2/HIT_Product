const mongoose = require("mongoose");
const ApiError = require("../utils/ApiError");
const CatchAsync = require("../utils/CatchAsync");
const paginate = require("../utils/paginate.util");
const { Story } = require("../models");
const { streamStory } = require("../config/ffmpeg");
const fsService = require("../services/fs.service");
const { find } = require("../models/friendship.model");

const createStory = CatchAsync(async (req, res, next) => {
   let linkName;
   if (req.file.mimetype.startsWith("video")) {
      linkName = `http://localhost:3000/videos/stories/${req.file.filename.replace(
         ".m3u8",
         ""
      )}/${req.file.filename}`;
      streamStory(req.file);
   } else if (req.file.mimetype.startsWith("image")) {
      linkName = `http://localhost:3000/images/stories/${req.file.filename}`;
   }
   const story = await Story.create({
      userId: req.user.id,
      story: linkName,
      type: req.body.typeFile,
   });
   if (!story) {
      return next(new ApiError("you can not create story !", 400));
   }
   res.status(200).json({
      status: "success",
      story,
   });
});

const getStories = CatchAsync(async (req, res, next) => {
   const stories = await Story.find({
      userId: req.user.id,
   });
   if (!stories) {
      return next(new ApiError("stories not exists !", 400));
   }
   res.status(200).json({
      status: "success",
      stories,
   });
});

const getStory = CatchAsync(async (req, res, next) => {
   const story = await Story.findById({
      _id: req.params.storyId,
   });
   if (!story) return next(new ApiError("story not exists!", 400));
   res.status(200).json({
      status: "success",
      story,
   });
});

const deleteStory = CatchAsync(async (req, res, next) => {
   const story = await Story.findByIdAndDelete({
      _id: req.params.storyId,
   });
   if (!story) {
      return next(new ApiError("story not exists !", 400));
   }
   const filename = story.story.split("/").pop();
   const fileVideo = filename.split(".");
   if (fileVideo[1] === "m3u8") {
      fsService.deleteDirectoryOrFile("stories", fileVideo[0], "video");
   } else if (fileVideo[1] === "jpeg")
      fsService.deleteDirectoryOrFile("stories", filename, "image");

   res.status(200).json({
      status: "success",
      story: story,
   });
});

module.exports = {
   getStory,
   getStories,
   createStory,
   deleteStory,
};
