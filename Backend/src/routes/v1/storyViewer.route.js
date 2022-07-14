const express = require("express");
const router = express.Router();

const { storyViewerController } = require("../../controllers");
const { protect, restrict } = require("../../middlewares/auth.middleware");

//CRUD
router.use(protect);

router.route("/:storyId").get(storyViewerController.getAllViewerOfStory);

router
   .route("/story-id/:storyId/own-story-id/:ownStoryId")
   .post(storyViewerController.createStoryViewer);

router
   .route("/story-viewer-id/:storyViewerId/emotion/:emotion")
   .patch(storyViewerController.updateStatusStoryViewer);

module.exports = router;
