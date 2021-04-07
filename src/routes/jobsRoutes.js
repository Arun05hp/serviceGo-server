const { Jobs } = require("../../models");
const express = require("express");
const multer = require("multer");
const path = require("path");
const requireAuth = require("../middlewares/auth");
const jwt = require("jsonwebtoken");
const https = require("https");
const router = express.Router();

const storage = multer.diskStorage({
  destination: `${path.basename(path.dirname(__dirname))}/uploads/jobimages/`,
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

const uploadImages = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
}).array("photos", 3);

router.post("/create", (req, res) => {
  uploadImages(req, res, async (err) => {
    if (err instanceof multer.MulterError) return res.send({ error: err });
    else if (err) return res.send({ error: "Something Went Wrong" });
    console.log(req.files);
    let images = null;
    if (req.files) {
      let imagesPath = req.files.map((item) =>
        item.path.replace(/\\/g, "/").substring(4)
      );
      images = JSON.stringify(imagesPath);
    }

    const data = req.body;

    try {
      const job = await Jobs.findOne({
        where: { userid: data.userid },
      });

      if (job) return res.status(400).json({ message: "Already Registered" });
      let newjob = await Jobs.create({
        ...data,
        images,
      });

      res.json({
        message: "Job created",
        newjob,
      });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  });
});

module.exports = router;