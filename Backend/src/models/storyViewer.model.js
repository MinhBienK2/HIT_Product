const mongoose = require("mongoose");

const storyViewerSchema = new mongoose.Schema(
   {
      storyId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Stories",
      },
      userIdOfStoryOwner: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Users",
      },
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Users",
      },
      emotions: [
         {
            type: String,
            enum: ["like", "love", "care", "haha", "wow", "sad", "angry"],
         },
      ],
   },
   {
      timestamps: false,
   }
);

const StoryViewer = mongoose.model("StoryViewers", storyViewerSchema);

module.exports = StoryViewer;
