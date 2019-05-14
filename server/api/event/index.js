let express = require("express");
let router = express.Router();
let controller = require("./event.controller");
router.post("/addEvent", controller.addEvent);
router.put("/editEvent", controller.editEvent);
router.put("/deleteEvent", controller.deleteEvent);
router.post("/eventList", controller.eventList);
module.exports = router;
