const { payments } = require("../../models");
const express = require("express");

const https = require("https");

const router = express.Router();

router.post("/create", async (req, res) => {
  const { userid, workerid, amount, transactionid } = req.body;
  console.log(req.body);

  try {
    console.log(err);
    await payments.create({ userid, workerid, amount, transactionid });
    res.json({
      message: "Success",
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});
module.exports = router;
