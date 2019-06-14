const Event = require("../models/Event");

module.exports = {

    async search(req, res) {
        const { term } = req.query;
        if (!term) {
            return res.status(204);
        }
        const events = await Event.find({ event: { "$regex": term, "$options": "i" } });
        return res.send(events);
    },
    async save(req, res) {
        try {
            let { event, custom_data } = req.body;
            const data = await Event.create({ event, custom_data, timestamp: new Date() });
            return res.send(data)
        } catch (error) {
            res.status(400).send({ message: "Error on create event" });
        }
    }
};