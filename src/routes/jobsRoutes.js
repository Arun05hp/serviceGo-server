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
      let imagesPath = req.files.map((item) => item.path);
      console.log(imagesPath);
    }

    //   const data = req.body;
    //   const fileUrl = req.file.path.replace(/\\/g, "/").substring(4);
    //   try {
    //     const user = await User.findByPk(data.id);
    //     console.log(user);
    //     if (!user) return res.status(400).json({ message: "User not found" });

    //     if (user.dataValues.status === 0) {
    //       Object.assign(user, {
    //         ...data,
    //         profileImg: fileUrl,
    //         otp: "",
    //         status: 1,
    //       });
    //       await user.save();
    //     } else {
    //       Object.assign(user, { ...data, profileImg: fileUrl, otp: "" });
    //       await user.save();
    //     }

    //     res.json({
    //       message: "Profile Updated Successfully",
    //       userId: user.dataValues,
    //     });
    //   } catch (error) {
    //     return res.status(500).json({ message: error });
    //   }
    return res.status(500).json({ message: "hello" });
  });
});

module.exports = router;
