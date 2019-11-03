const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const router = require("./router");

class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.database();
        this.routes();
    }
    middlewares() {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.set("view options", { layout: false });
        this.app.use(express.static(path.resolve(__dirname, 'resources')));
    }
    database() {
        const host = "mongo";
        const port = process.env.DBPORT || 27017;

        mongoose.connect(`mongodb://${host}:${port}/ditoapi`, { useNewUrlParser: true });
    }
    routes() {
        this.app.use("/api", router)
        this.app.get('/', function (req, res) {
            res.sendFile(__dirname + '/resources/index.html');
        });
    }
    run() {
        const port = process.env.PORT || 80;
        this.app.listen(port, () => console.log(`listen on port ${port}`));
    }
}

new App().run();