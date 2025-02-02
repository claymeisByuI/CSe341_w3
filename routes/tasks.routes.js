const express = require("express");
const router = express.Router();

const tasksController = require("../controllers/tasks.controller");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", isAuthenticated, tasksController.getAllTasks);
router.get("/:id", tasksController.getTaskById);
router.post("/", isAuthenticated, tasksController.createTask);
router.put("/:id", isAuthenticated, tasksController.updateTask);
router.delete("/:id", isAuthenticated, tasksController.deleteTask);

module.exports = router;
