const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.use("/tasks", require("./tasks.routes"));
router.use("/users", require("./users.routes"));
module.exports = router;
