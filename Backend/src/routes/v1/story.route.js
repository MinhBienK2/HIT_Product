const express = require("express");
const router = express.Router();

const upload = require("../../config/multer");

const { storyController } = require("../../controllers");
const { protect, restrict } = require("../../middlewares/auth.middleware");

//CRUD
router.use(protect);

router
   .route("/")
   .get(storyController.getStories)
   .post(upload.uploadStory, storyController.createStory);

router
   .route("/:storyId")
   .get(storyController.getStory)
   .delete(storyController.deleteStory);

module.exports = router;
