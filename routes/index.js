const router = require("express").Router();
router.use("/tasks", require("./tasks.routes"));
router.use("/users", require("./users.routes"));
router.use("/", require("./authenticate.routes"));

module.exports = router;
