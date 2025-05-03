const { Router } = require("express");
const { validateTask } = require("../Validation/taskValidation");
const taskRouter = Router();
const {
  getTask,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskByPriority,
} = require("../Controller/taskController");

taskRouter.get("/tasks", getTasks);
taskRouter.get("/tasks/:id", getTask);
taskRouter.post("/tasks", [validateTask], createTask);
taskRouter.put("/tasks/:id", [validateTask], updateTask);
taskRouter.delete("/tasks/:id", deleteTask);
taskRouter.get("/tasks/priority/:level", getTaskByPriority);

module.exports = taskRouter;
