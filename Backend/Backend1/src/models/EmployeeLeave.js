const mongoose = require("mongoose");

const employeeLeaveSchema = new mongoose.Schema({
  leaveId: {
    type: String
  },
  employeeId: {
    type: String,
    required: true
  },
  leaveStart: {
    type: Date,
    required: true,
    default: Date.now
  },
  leaveEnd: {
    type: Date,
    required: true,
    default: Date.now
  },
  reason: {
    type: String,
    required: true
  },
  type: {
    type: String
   
  },
  status: {
    type: String,
    required: true,
    enum: ["Approved", "NonApproved"],
    default: "NonApproved"
  },
  approvedBy: {
    type: String,
    default: "-"
  }
});

module.exports = mongoose.model("employeeLeave", employeeLeaveSchema);
