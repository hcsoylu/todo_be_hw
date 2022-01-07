import mongoose from "mongoose";

const { Schema, model } = mongoose;

const TodoSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export default model("Todo", TodoSchema);
