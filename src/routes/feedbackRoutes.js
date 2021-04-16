const { feedback } = require("../../models");
const express = require("express");
const multer = require("multer");
const path = require("path");
const requireAuth = require("../middlewares/auth");
const jwt = require("jsonwebtoken");

const https = require("https");

const router = express.Router();

router.post("/create", async (req, res) => {
  const { userid, rating, comment, recommend } = req.body;

  try {
    const feedbackData = await feedback.findOne({
      where: {
        id: userid,
      },
    });

    if (!feedbackData)
      return res.status(400).json({ message: "User not found" });

    let feed = JSON.parse(feedbackData.dataValues.feedback);
    feed = JSON.stringify([...req.body]);
    Object.assign(feedbackData, {
      feed,
    });
    await user.save();

    res.json({
      message: "Success",
      userDetails: user.dataValues,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
});

module.exports = router;
