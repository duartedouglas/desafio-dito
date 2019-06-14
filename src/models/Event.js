const mongoose = require("mongoose");

const EventShema = new mongoose.Schema({
    event: String,
    custon_data: [],
    timestamp: String
}, {
        timestamps: true
    });

module.exports = mongoose.model("Event", EventShema);