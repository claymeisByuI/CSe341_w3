const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users.controller");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", isAuthenticated, usersController.getAllUsers);
router.get("/:id", usersController.getUserById);
router.post("/", isAuthenticated, usersController.createUser);
router.put("/:id", isAuthenticated, usersController.updateUser);
router.delete("/:id", isAuthenticated, usersController.deleteUser);

module.exports = router;
