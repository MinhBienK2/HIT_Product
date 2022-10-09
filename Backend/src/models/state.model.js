const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema(
    {
        typeState: {
            type: String,
            required: true,
            enum: ["activeState"],
        },
        state: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const State = mongoose.model("States", stateSchema);

module.exports = State;
