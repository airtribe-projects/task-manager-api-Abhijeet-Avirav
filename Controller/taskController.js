const { writeFile } = require("../utils/writeFile");
const { readFile } = require("../utils/readFile");
const { ApiError } = require("../utils/apiError");
const path = require("path");

const getTasks = async (req, res) => {
  let { tasks } = await readFile(path.join(__dirname, "../task.json"));
  let { completed, sortBy = "createdAt", order = "desc" } = req.query;
  completed =
    completed === "true" ? (completed === "false" ? false : false) : "";

  if (completed) {
    tasks = tasks.filter((task) => task.completed === completed);
  }

  if (sortBy) {
    tasks = tasks.sort((task1, task2) => {
      if (order === "desc") {
        return new Date(task2[sortBy]) - new Date(task1[sortBy]);
      } else {
        return new Date(task1[sortBy]) - new Date(task2[sortBy]);
      }
    });
  }

  return res.status(200).json({ data: tasks });
};

const getTask = async (req, res, next) => {
  const { tasks } = await readFile(path.join(__dirname, "../task.json"));
  const id = parseInt(req.params.id);

  const task = tasks.find((task) => task.id === id);
  if (!task) {
    return next(new ApiError(`No task with id: ${id}`, 404));
  }

  return res.status(200).json({ data: task });
};

const createTask = async (req, res) => {
  const { tasks } = await readFile(path.join(__dirname, "../task.json"));
  const { title, description, completed = false, priority = "low" } = req.body;
  const id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;

  const newTask = {
    id,
    title,
    description,
    completed,
    priority,
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  await writeFile(path.join(__dirname, "../task.json"), { tasks });

  return res.status(201).json({ data: newTask });
};

const updateTask = async (req, res, next) => {
  const { tasks } = await readFile(path.join(__dirname, "../task.json"));

  const id = parseInt(req.params.id);
  const { title, description, completed } = req.body;

  const task = tasks.find((task) => task.id === id);
  if (!task) {
    return next(new ApiError(`No task with id: ${id}`, 404));
  }

  task.title = title;
  task.description = description;
  task.completed = completed;

  await writeFile(path.join(__dirname, "../task.json"), { tasks });

  return res.status(200).json({ msg: `Task updated successfully`, data: task });
};

const deleteTask = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const { tasks } = await readFile(path.join(__dirname, "../task.json"));

  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return next(`No task with id: ${id}`, 404);
  }

  tasks.splice(taskIndex, 1);

  await writeFile(path.join(__dirname, "../task.json"), { tasks });
  return res.status(200).json({ msg: "Task deleted successfully" });
};

const getTaskByPriority = async (req, res) => {
  let { tasks } = await readFile(path.join(__dirname, "../task.json"));
  const level = req.params.level;

  tasks = tasks.filter((task) => task.priority === level);

  return res.status(200).json({ data: tasks });
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskByPriority,
};
