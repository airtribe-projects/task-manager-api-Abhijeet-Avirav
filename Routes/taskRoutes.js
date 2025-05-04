const { Router } = require("express");
const { taskValidationMiddleware } = require("../Validation/taskValidation");
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
taskRouter.post("/tasks", [taskValidationMiddleware], createTask);
taskRouter.put("/tasks/:id", [taskValidationMiddleware], updateTask);
taskRouter.delete("/tasks/:id", deleteTask);
taskRouter.get("/tasks/priority/:level", getTaskByPriority);

module.exports = taskRouter;
