import Course from "./Course.model.js";

export const createCourse = async (courseData) => {
  return await Course.create(courseData);
};

export const findAllCourses = async () => {
  return await Course.find();
};

export const findCourseById = async (courseId) => {
  return await Course.findById(courseId);
};

export const updateCourse = async (courseId, courseData) => {
  return await Course.findByIdAndUpdate(courseId, courseData, { new: true });
};

export const deleteCourse = async (courseId) => {
  return await Course.findByIdAndDelete(courseId);
};
