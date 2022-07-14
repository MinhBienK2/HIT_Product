const { storyService } = require("../services");

// // CRUD User

const getStory = storyService.getStory;
const getStories = storyService.getStories;
const createStory = storyService.createStory;
const deleteStory = storyService.deleteStory;

module.exports = {
   getStory,
   getStories,
   createStory,
   deleteStory,
};
