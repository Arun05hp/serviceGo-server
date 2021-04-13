const { Deals } = require("../../models");
const express = require("express");
const multer = require("multer");
const path = require("path");
const requireAuth = require("../middlewares/auth");
const jwt = require("jsonwebtoken");

const https = require("https");

const router = express.Router();
router.post("/create", async (req, res) => {
  const { userid, workerid, duration, startDate, amount } = req.body;
  console.log(req.body);

  try {
    await Deals.create({ userid, workerid, duration, startDate, amount });
    res.json({
      message: "Success",
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

module.exports = router;
