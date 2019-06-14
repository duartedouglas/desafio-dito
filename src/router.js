const { Router } = require("express");
const EventController = require("./controllers/EventController");
const TimelineController = require("./controllers/TimelineController");

const routes = Router();

routes.get("/events/search", EventController.search);
routes.post("/events", EventController.save);
routes.get("/timeline", TimelineController.timeline);

module.exports = routes; 