const express = require("express");
const _ = require('lodash');
const Employee = require("../models/Employee");
const service = require("../services/UtilService");

const employeeRouter = express.Router();

// Getting all Employees data
employeeRouter.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    const updatedEmployees = employees.map(employee => _.set(employee, 'id', employee._id));
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Creating new Employee
employeeRouter.post("/", async (req, res) => {
  const {
    firstName,
    empId,
    lastName,
    address,
    religion,
    city,
    country,
    postalCode,
    status,
    skills,
    email,
    role,
    manager,
    password,
  } = req.body;
  const employee = new Employee({
    firstName,
    lastName,
    address,
    city,
    country,
    postalCode,
    religion,
    empId,
    status,
    skills,
    email,
    role,
    manager,
    password
  });

  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get employee by Id
employeeRouter.get("/:id", service.getEmployeeById, (req, res) => {
  const updatedEmployee =  _.set(res.employee, 'id', res.employee._id);  
  res.json(updatedEmployee);
});

// Updating Employee By Id
employeeRouter.put("/:id", service.getEmployeeById, async (req, res) => {
  const keyList = Object.keys(req.body);
  keyList.map(key => {
    if (req.body[key] != null) {
      res.employee[key] = req.body[key];
    }
  });
  try {
    const updatedEmployee = await res.employee.save();
    res.json(updatedEmployee);
  } catch {
    res.status(400).json({ message: err.message });
  }
});

// Deleting one Employee
employeeRouter.delete("/:id", service.getEmployeeById, async (req, res) => {
  try {
    await res.employee.remove();
    res.json({ message: "Deleted This Employee" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = employeeRouter;
