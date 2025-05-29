const express = require("express");
const router = express.Router();
const {getAllTask,getAllTaskOfProject ,createTask, editTask ,deleteTask} = require("../controllers/task.controller");


router.get("/",getAllTask);
router.get("/:id",getAllTaskOfProject);
router.post("/",createTask);
router.put("/:id",editTask);
router.delete("/:id",deleteTask);

module.exports = router;