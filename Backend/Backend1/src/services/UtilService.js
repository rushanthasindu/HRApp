const _ = require("lodash");
const Leave = require("../models/EmployeeLeave");
const Employee = require("../models/Employee");
const Project = require("../models/Project");
const Const = require("../Constant");

/**
 * @description fetch leave object by leave Id
 */
async function getLeaveById(req, res, next) {
  try {
    leave = await Leave.findById(req.params.id);
    if (leave == null) {
      return res.status(404).json({ message: "Cant find Leave for given Id" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.leave = leave;
  next();
}

/**
 * @description fetch employee object by employee Id
 */
async function getEmployeeById(req, res, next) {
  try {
    employee = await Employee.findById(req.params.id);
    if (employee == null) {
      return res
        .status(404)
        .json({ message: "Cant find Employee for given Id" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.employee = employee;
  next();
}

/**
 * @description fetch project object by project Id
 */
async function getProjectById(req, res, next) {
  try {
    project = await Project.findById(req.params.id);
    if (project == null) {
      return res
        .status(404)
        .json({ message: "Cant find Project for given Id" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.project = project;
  next();
}

/**
 * @description fetch un approved leaves of employees assigned to given manager
 */
async function getLeavesForApproval(req, res, next) {
  try {
    const managerId = req.params.id;
    const employees = await Employee.find();
    const employeesForManager = employees.filter(
      employee => employee.manager === managerId
    );

    if (employeesForManager.length <= 0) {
      return res
        .status(404)
        .json({ message: "Cant find employees for Manager Id" });
    }

    const leaves = await Leave.find();
    const employeeIdsForManager = employeesForManager.map(
      employee => `${employee._id}`
    );
    const leavesForSelectedEmployees = leaves.filter(leave =>
      employeeIdsForManager.includes(leave.employeeId)
    );
    res.leavesByEmployee = leavesForSelectedEmployees;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

/**
 * @description fetch all leaves for given employee
 */
async function getLeaveHistoryByEmployee(req, res, next) {
  try {
    const employeeId = req.params.id;

    if (employeeId === null) {
      return res
        .status(404)
        .json({ message: "Cant find employee for given Id" });
    }

    const leaves = await Leave.find();

    const leavesForSelectedEmployee = leaves.filter(
      leave => leave.employeeId === employeeId
    );
    res.leavesByEmployee = leavesForSelectedEmployee;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

/**
 * @description update project and assign rates for employees if project is completed
 */
async function updateProjectCompletion(req, res, next) {
  try {
    let ratio = 0;
    const projectId = req.params.id;

    if (projectId === null) {
      return res
        .status(404)
        .json({ message: "Cant find project for given Id" });
    }

    const project = await Project.findById(projectId);
    const endDate = project.endDate;
    const actualCompletion = req.body.actualCompletionDate;

    console.log(actualCompletion);
    console.log(project.actualCompletionDate);
    console.log(actualCompletion && !project.actualCompletionDate);
    if (actualCompletion && !project.actualCompletionDate) {
      const timeDiffDays = Math.ceil(
        (new Date(endDate) - new Date(actualCompletion)) / Const.MILLIS_PER_DAY
      );
      ratio += timeDiffDays * Const.PROJECT_SUCCESS_RATIO;
      console.log("actualCompletionDate.ratio", ratio);
      const employees = project.allocation;

      for (const employeeId of employees) {
        let employeeObj = await Employee.findById(employeeId);
        if (employeeObj) {
          const leaves = await Leave.find();
          const leavesForSelectedEmployee = leaves.filter(
            leave => leave.employeeId === employeeId
          );
          console.log(
            "leavesForSelectedEmployee.length",
            leavesForSelectedEmployee.length
          );
          ratio += leavesForSelectedEmployee.length * Const.LEAVE_RATIO;
          console.log("leavesForSelectedEmployee.ratio", ratio);
          employeeObj.reliability += ratio;
          employeeObj.save();
        }
      }
    }

    res.project = project;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

/**
 * @description fetch employees for given skill
 */
async function getTopEmployeesBySkill(req, res, next) {
  try {
    const skill = req.params.skill;
    const employees = await Employee.find();
    const employeesWithSkill = employees.filter(employee =>
      employee.skills.includes(skill)
    );
    const sortedEmployeeList = _.orderBy(
      employeesWithSkill,
      ["reliability", "firstName"],
      ["desc", "asc"]
    );
    res.employeeList = sortedEmployeeList;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = {
  getEmployeeById,
  getLeaveById,
  getProjectById,
  getLeavesForApproval,
  getLeaveHistoryByEmployee,
  updateProjectCompletion,
  getTopEmployeesBySkill
};
