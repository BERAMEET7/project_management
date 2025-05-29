const express = require("express");
const router = express.Router();
const {getAllProject ,createProject, editProject ,deleteProject} = require("../controllers/project.controller");


router.get("/",getAllProject);
router.post("/",createProject);
router.put("/:id",editProject);
router.delete("/:id",deleteProject);

module.exports = router;