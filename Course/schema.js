import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  number: { type: String, required: true, unique: true },  // Course number, unique for each course
  name: { type: String, required: true },  // Name of the course
  startDate: { type: Date, required: true },  // Start date of the course
  endDate: { type: Date, required: true },  // End date of the course
  department: { type: String, required: true },  // Department offering the course
  credits: { type: Number, required: true },  // Number of credits for the course
  description: { type: String },  // Description of the course
  createdAt: { type: Date, default: Date.now },  // Date when the course was created
},
{ collection: "courses" }  // Name of the collection in MongoDB
);

export default mongoose.model("Course", courseSchema);
