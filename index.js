const express = require("express");
const cors = require("cors");
const app = express();
const { serviceKey } = require("./constants");
var admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert(serviceKey),
});

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST"],
    })
);

app.use(express.static(__dirname + "/public"));

const blogController = require("./controllers/blog");
app.use("/blog", blogController);

const imageController = require("./controllers/image");
app.use("/image", imageController);

app.get("/", (req, res) => {
    res.status(200).json({
        msg: "Welcome!",
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log("Server is running! " + PORT);
