const { Jobs } = require("../../models");
const express = require("express");

const router = express.Router();

router.post("/create", async (req, res) => {
  const { workerid, userid, rating, comment, recommend } = req.body;

  try {
    const feedbackData = await Jobs.findOne({
      where: {
        userid: workerid,
      },
    });

    if (!Jobs) return res.status(400).json({ message: "User not found" });

    if (feedbackData.dataValues.feedback) {
      Object.assign(feedbackData, {
        feedback: [
          ...feedbackData.dataValues.feedback,
          { userid, rating, comment, recommend },
        ],
      });
    } else {
      Object.assign(feedbackData, {
        feedback: [{ userid, rating, comment, recommend }],
      });
    }

    await feedbackData.save();

    res.json({
      message: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
});

module.exports = router;
