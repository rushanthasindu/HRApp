const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectId: {
    type: String
  },
  customerName: {
    type: String
  },
  customerContact: {
    type: String
  },
   customerEmail: {
     type: String
   },
  projectName: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  actualCompletionDate: {
    type: Date,  
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["java", "node", "react", "python"]
  },
  allocation: {
    type: Array,
    required: true,
    default: []
  },
  completionRate: {
    type: Number,
    required: true,
    default: 0
  }
});

module.exports = mongoose.model("Project", projectSchema);
