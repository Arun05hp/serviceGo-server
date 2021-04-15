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

router.get("/getAll/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deals = await Deals.findAll({
      where: {
        userid: id,
      },
    });

    return res.json({
      message: "Success",
      deals,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
});

module.exports = router;
