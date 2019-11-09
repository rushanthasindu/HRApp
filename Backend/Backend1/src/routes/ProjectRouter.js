const express = require("express");
const Project = require("../models/Project");
const service = require("../services/UtilService");

const projectRouter = express.Router();

// Getting all project data
projectRouter.get("/", async (req, res) => {
  try {
    const projectList = await Project.find();
    res.json(projectList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Creating new project
projectRouter.post("/", async (req, res) => {
  const {
    projectName,
    startDate,
    endDate,
    type,
    allocation,
    completionRate,
    customerEmail,
    customerContact,
    comment,
    actualCompletionDate,
    customerName
  } = req.body;
  const project = new Project({
    projectName,
    startDate,
    endDate,
    type,
    allocation,
    completionRate,
    customerEmail,
    customerContact,
    comment, 
    actualCompletionDate,
    customerName
  });

  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get project by Id
projectRouter.get("/:id", service.getProjectById, (req, res) => {
  res.json(res.project);
});

// Updating Project By Id
projectRouter.put(
  "/:id",
  service.updateProjectCompletion,
  async (req, res) => {
    const keyList = Object.keys(req.body);
    keyList.map(key => {
      if (req.body[key] != null) {
        res.project[key] = req.body[key];
      }
    });
    try {
      const updatedProject = await res.project.save();
      res.json(updatedProject);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

// Deleting given project
projectRouter.delete("/:id", service.getProjectById, async (req, res) => {
  try {
    await res.project.remove();
    res.json({ message: "Deleted The Project" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = projectRouter;
