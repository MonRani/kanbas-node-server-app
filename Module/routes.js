import express from "express";
import * as dao from "./Module.dao.js";  // Import the Module DAO

const router = express.Router();

// Create a new module
router.post("/modules", async (req, res) => {
  try {
    const module = await dao.createModule(req.body);
    res.status(201).json(module);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all modules
router.get("/modules", async (req, res) => {
  try {
    const modules = await dao.findAllModules();
    res.json(modules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a module by ID
router.get("/modules/:moduleId", async (req, res) => {
  try {
    const module = await dao.findModuleById(req.params.moduleId);
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }
    res.json(module);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a module by ID
router.put("/modules/:moduleId", async (req, res) => {
  try {
    const module = await dao.updateModule(req.params.moduleId, req.body);
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }
    res.json(module);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a module by ID
router.delete("/modules/:moduleId", async (req, res) => {
  try {
    const module = await dao.deleteModule(req.params.moduleId);
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }
    res.status(204).send();  // 204 No Content
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
