const express = require("express");
const router = express.Router();
const projectrouter = require("./project.router");
const taskrouter = require("./task.router");


router.use("/project",projectrouter);
router.use("/task",taskrouter);

module.exports = router;