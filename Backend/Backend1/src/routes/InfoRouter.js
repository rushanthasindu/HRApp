const express = require("express");
const Service = require("../services/UtilService");

const infoRouter = express.Router();

// Get Non approved leaves under manager
infoRouter.get(
  "/leave-by-manager/:id",
  Service.getLeavesForApproval,
  (req, res) => {
    res.json(res.leavesByEmployee);
  }
);

// Get Leave history be employee
infoRouter.get(
  "/leave-by-employee/:id",
  Service.getLeaveHistoryByEmployee,
  (req, res) => {
    res.json(res.leavesByEmployee);
  }
);

infoRouter.get(
  "/employees-by-skill/:skill",
  Service.getTopEmployeesBySkill,
  (req, res) => {
    res.json(res.employeeList);
  }
);

module.exports = infoRouter;
