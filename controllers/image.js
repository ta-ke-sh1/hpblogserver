const express = require("express");
const multer = require("multer");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const {
    fetchAllMatchingDocuments,
    fetchAllDocuments,
    fetchDocumentById,
} = require("../service/firebaseService");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(req.body.date);
        var dir = path.resolve() + "/images";
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
    const id = req.query.id;
    if (id) {
        const document = await fetchDocumentById("image", id);
        res.status(200).json(document);
    } else {
        const documents = await fetchAllDocuments("image");
        res.status(200).json(documents);
    }
});

router.delete("/", async (req, res) => {
    res.status(200).json({
        msg: "delete request",
    });
});

router.post("/", upload.array("images", 10), async (req, res) => {
    var fileNames = [];
    for (let i = 0; i < req.files.length; i++) {
        fileNames.push(req.files[i].filename);
    }

    res.status(200).json({
        msg: "post request",
        images: fileNames,
        date: req.body.date,
    });
});

router.put("/", upload.array("images", 10), async (req, res) => {
    res.status(200).json({
        msg: "put request",
    });
});

router.patch("/", upload.array("images", 10), async (req, res) => {
    res.status(200).json({
        msg: "patch request",
    });
});

module.exports = router;
