const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

dotenv.config({ path: `./config.env` });

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(cors({
    origin: ["*"],
    methods: ["GET", "POST"],
    credentials: true
}))

if (process.env.NODE_ENV === "production") {
    const path = require('path');

    app.get('/', (req, res) => {
        app.use(express.static(path.resolve(__dirname,'client','build')));
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

require("./db/db")
app.use(express.json());

app.use(require('./router/routers'))

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}....`));