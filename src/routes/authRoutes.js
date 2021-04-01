const { User } = require("../../models");
const express = require("express");
const requireAuth = require("../middlewares/auth");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const https = require("https");

const router = express.Router();

async function sendOtp(url, options) {
  const req = await https.request(url, options, (res) => {
    res.on("data", (d) => {});
  });

  req.on("error", (error) => {
    return res.status(400).json({ message: error });
  });

  req.end();
}

router.post("/sendOtp", async (req, res) => {
  const data = req.body;
  //   const { error } = validate(data);
  //   if (error) return res.status(400).json({ message: error.details[0].message });

  const { mobileNumber } = data;
  console.log(mobileNumber);
  let otp = Math.floor(1000 + Math.random() * 9000);
  try {
    let url = `https://2factor.in/API/R1/?module=TRANS_SMS&apikey=71acc5f0-8420-11eb-a9bc-0200cd936042&to=${mobileNumber}&from=ServGo&templatename=ServiceGo&var1=${otp}`;
    const options = {
      method: "POST",
    };
    const user = await User.findOne({ where: { mobileNumber: mobileNumber } });
    if (!user) {
      await User.create({
        mobileNumber: mobileNumber,
        otp: otp,
        status: 0,
      });
      sendOtp(url, options);
    } else {
      Object.assign(user, { otp: otp });
      await user.save();
      sendOtp(url, options);
    }

    res.json({
      message: "Success",
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.post("/verifyOtp", async (req, res) => {
  const data = req.body;
  //   const { error } = auth(data);
  //   if (error) return res.status(400).json({ message: error.details[0].message });

  const { mobileNumber, otp } = data;
  let newRegistration = false;
  try {
    const user = await User.findOne({
      where: { mobileNumber: mobileNumber, otp: otp },
    });
    console.log(user);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    } else {
      if (user.dataValues.status === 0) newRegistration = true;
    }

    // const token = jwt.sign({ userId: user.iduser }, config.Key_String, {
    //   expiresIn: "5d",
    // });
    res.json({
      message: "Verified Successfully",
      newRegistration,
      userDetails: {
        id: user.dataValues.id,
        mobileNumber: user.dataValues.mobileNumber,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.put("/register/:id", async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  // const { error } = validateProfile(data);
  // if (error) return res.status(400).json({ message: error.details[0].message });
  try {
    const user = await User.findByPk(id);

    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.dataValues.status === 0) {
      Object.assign(user, { ...data, otp: "", status: 1 });
      await user.save();
    } else return res.status(400).json({ message: "User Already Registered" });

    res.json({
      message: "Profile Updated Successfully",
      userId: user.dataValues,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

module.exports = router;
