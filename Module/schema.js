import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  id: { type: String, required: true },  // Unique identifier for each lesson
  name: { type: String, required: true },  // Name of the lesson
  description: { type: String, required: true },  // Description of the lesson
  module: { type: String, required: true },  // Module to which the lesson belongs
});

const moduleSchema = new mongoose.Schema({
  name: { type: String, required: true },  // Name of the module
  description: { type: String },  // Description of the module
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },  // Reference to the course
  lessons: [lessonSchema],  // Array of lessons in the module
  createdAt: { type: Date, default: Date.now },  // Date when the module was created
},
{ collection: "modules" }  // Name of the collection in MongoDB
);

export default mongoose.model("Module", moduleSchema);
