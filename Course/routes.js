import express from "express";
import * as dao from "./Course.dao.js";  // Import the Course DAO

const router = express.Router();

// Create a new course
router.post("/courses", async (req, res) => {
  try {
    const course = await dao.createCourse(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all courses
router.get("/courses", async (req, res) => {
  try {
    const courses = await dao.findAllCourses();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a course by ID
router.get("/courses/:courseId", async (req, res) => {
  try {
    const course = await dao.findCourseById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a course by ID
router.put("/courses/:courseId", async (req, res) => {
  try {
    const course = await dao.updateCourse(req.params.courseId, req.body);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a course by ID
router.delete("/courses/:courseId", async (req, res) => {
  try {
    const course = await dao.deleteCourse(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(204).send();  // 204 No Content
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
