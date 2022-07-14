const { storyViewerService } = require("../services");

// // CRUD User

const createStoryViewer = storyViewerService.createStoryViewer;
const updateStatusStoryViewer = storyViewerService.updateStatusStoryViewer;
const getAllViewerOfStory = storyViewerService.getAllViewerOfStory;

module.exports = {
   getAllViewerOfStory,
   createStoryViewer,
   updateStatusStoryViewer,
};
