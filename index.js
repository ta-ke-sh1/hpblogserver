const express = require("express");
const app = express();
const { serviceKey } = require("./constants");
var admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert(serviceKey),
});

app.use(express.static(__dirname + "/assets"));

const blogController = require("./controllers/blog");
app.use("/blog", blogController);

app.get("/", (req, res) => {
    res.status(200).json({
        msg: "Welcome!",
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log("Server is running! " + PORT);
