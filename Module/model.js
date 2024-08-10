import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  createdAt: { type: Date, default: Date.now },
});

const Module = mongoose.model("Module", moduleSchema);

export default Module;
