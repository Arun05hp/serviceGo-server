const { Deals } = require("../../models");
const express = require("express");

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
