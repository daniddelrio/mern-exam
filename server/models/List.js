const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  isComplete: Boolean,
  content: String,
  timestamp: Date,
});

const listSchema = mongoose.Schema(
  {
    title: String,
    dateCreated: Date,
    // completedTasks: { type: Number, default: 0 },
    // incompleteTasks: { type: Number, default: 0 },
    tasks: [{ type: taskSchema }],
  },
  { toJSON: { virtuals: true } }
);
listSchema.virtual("completedTasks").get(function () {
  return this.tasks.filter((task) => task.isComplete).length;
});
listSchema.virtual("incompleteTasks").get(function () {
  return this.tasks.filter((task) => !task.isComplete).length;
});

module.exports = mongoose.model("List", listSchema);
