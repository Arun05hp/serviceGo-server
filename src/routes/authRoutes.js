const { User, Jobs } = require("../../models");
const express = require("express");
const multer = require("multer");
const path = require("path");
const requireAuth = require("../middlewares/auth");
const jwt = require("jsonwebtoken");

const https = require("https");

const router = express.Router();

const storage = multer.diskStorage({
  destination: `${path.basename(path.dirname(__dirname))}/uploads/profiles/`,
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

const uploadImage = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
}).single("photo");

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
  const { mobileNumber } = req.body;
  //   const { error } = validate(data);
  //   if (error) return res.status(400).json({ message: error.details[0].message });

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
      // sendOtp(url, options);
    } else {
      Object.assign(user, { otp: otp });
      await user.save();
      // sendOtp(url, options);
    }

    res.json({
      message: "Success",
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.post("/verifyOtp", async (req, res) => {
  const { mobileNumber, otp } = req.body;
  //   const { error } = auth(data);
  //   if (error) return res.status(400).json({ message: error.details[0].message });

  let newRegistration = false;
  try {
    const user = await User.findOne({
      where: { mobileNumber: mobileNumber },
      include: ["jobprofile"],
    });

    if (!user) return res.status(400).json({ message: "User not found" });
    else if (user.dataValues.otp !== otp)
      res.status(400).json({ message: "Invalid OTP" });
    else if (user.dataValues.status === 0) newRegistration = true;

    // const token = jwt.sign({ userId: user.iduser }, config.Key_String, {
    //   expiresIn: "5d",
    // });
    res.json({
      message: "Verified Successfully",
      newRegistration,
      userDetails: user.dataValues,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.put("/register/:id", async (req, res) => {
  console.log("user");
});

router.post("/image", (req, res) => {
  uploadImage(req, res, (err) => {
    if (err instanceof multer.MulterError)
      return res.send({ error: "File Too Large" });
    else if (err) return res.send({ error: "Something Went Wrong" });

    let fileUrl = req.file.path.replace(/\\/g, "/").substring(4);
    console.log(req.file, fileUrl);
    if (req.file) return res.json({ msg: "Image uploaded" });
    res.send("Image upload failed");
  });
});

router.post("/update", (req, res) => {
  uploadImage(req, res, async (err) => {
    try {
      if (err instanceof multer.MulterError)
        return res.send({ error: "File Too Large" });
      else if (err) return res.send({ error: "Something Went Wrong" });

      if (req.file) {
        const data = req.body;
        const fileUrl = req.file.path.replace(/\\/g, "/").substring(4);
        console.log(data.id);
        const user = await User.findByPk(data.id);
        console.log(user);
        if (!user) return res.status(400).json({ message: "User not found" });

        if (user.dataValues.status === 0) {
          Object.assign(user, {
            ...data,
            profileImg: fileUrl,
            otp: "",
            status: 1,
            wishlist: "[]",
          });
          await user.save();
        } else {
          Object.assign(user, { ...data, profileImg: fileUrl, otp: "" });
          await user.save();
        }
        console.log(user.dataValues);
        res.json({
          message: "Profile Updated Successfully",
          userDetails: user.dataValues,
        });
      }
      res.status(400).json({ message: "Image Not Found" });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  });
});

router.post("/wishlist", async (req, res) => {
  const { userid, workerid } = req.body;

  try {
    const user = await User.findOne({
      where: { id: userid },
    });

    if (!user) return res.status(400).json({ message: "User not found" });

    let wishlist = JSON.parse(user.dataValues.wishlist);
    wishlist = JSON.stringify([...wishlist, workerid]);
    Object.assign(user, {
      wishlist,
    });
    await user.save();

    res.json({
      message: "Success",
      userDetails: user.dataValues,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});
router.delete("/wishlist/:userid/:workerid", async (req, res) => {
  const { userid, workerid } = req.params;

  try {
    const user = await User.findOne({
      where: { id: userid },
    });

    if (!user) return res.status(400).json({ message: "User not found" });

    let wishlist = JSON.parse(user.dataValues.wishlist);
    if (wishlist.length > 0) {
      wishlist = JSON.stringify(
        wishlist.filter((id) => id !== Number(workerid))
      );
      Object.assign(user, {
        wishlist,
      });
      await user.save();
    }

    res.json({
      message: "Success",
      userDetails: user.dataValues,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.post("/getwishlist", async (req, res) => {
  const { ids } = req.body;
  console.log(ids);
  try {
    const worker = await Jobs.findAll({
      where: {
        userid: ids,
      },
      include: ["user"],
    });
    res.json({
      message: "success",
      worker,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

module.exports = router;
