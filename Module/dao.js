import Module from "./Module.model.js";

export const createModule = async (moduleData) => {
  return await Module.create(moduleData);
};

export const findAllModules = async () => {
  return await Module.find().populate("course");
};

export const findModuleById = async (moduleId) => {
  return await Module.findById(moduleId).populate("course");
};

export const updateModule = async (moduleId, moduleData) => {
  return await Module.findByIdAndUpdate(moduleId, moduleData, { new: true });
};

export const deleteModule = async (moduleId) => {
  return await Module.findByIdAndDelete(moduleId);
};
