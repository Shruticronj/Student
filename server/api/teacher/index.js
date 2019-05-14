let express = require("express");
let router = express.Router();
let controller = require("./teacher.controller");
router.post("/addTeacher", controller.addTeacher);
router.put("/editTeacher", controller.editTeacher);
router.put("/deleteTeacher", controller.deleteTeacher);
router.post("/getTeacherList", controller.getTeacher);
module.exports = router;
