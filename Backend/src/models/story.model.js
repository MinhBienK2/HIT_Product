const mongoose = require("mongoose");
const moment = require("moment");

const storySchema = new mongoose.Schema({
   userId: {
      type: mongoose.Schema.ObjectId,
      ref: "Users",
   },
   story: {
      type: String,
      required: true,
   },
   type: {
      type: String,
      enum: ["image", "video"],
   },
   createdAt: {
      type: Date,
      default: moment(),
   },
});

storySchema.pre(/^find/,function(next) {
   this.populate({
      path : 'userId',
      select : ['name','avatar']
   })
   next()
})

const Story = mongoose.model("Stories", storySchema);

module.exports = Story;
