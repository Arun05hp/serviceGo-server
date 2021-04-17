const { Deals, User, Jobs } = require("../../models");
const express = require("express");

const router = express.Router();

async function fetchUserInfo(item) {
  const userDetails = await User.findOne({
    raw: true,
    where: {
      id: item.workerid,
    },
    include: [{ model: Jobs, as: "jobprofile", attributes: ["category"] }],
    attributes: ["id", "name", "mobileNumber", "profileImg"],
  });
  return { ...item, workerProfile: userDetails };
}

router.post("/create", async (req, res) => {
  const { userid, workerid, duration, startDate, amount } = req.body;
  console.log(req.body);

  try {
    await Deals.create({
      userid,
      workerid,
      duration,
      startDate,
      amount,
      status: "0",
    });
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
    let deals = await Deals.findAll({
      raw: true,
      where: {
        userid: id,
      },
    });

    deals = await Promise.all(
      deals.map(async (item) => {
        return await fetchUserInfo(item);
      })
    );

    return res.json({
      message: "Success",
      deals,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
});

router.delete("/reject/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Deals.destroy({
      where: {
        id,
      },
    });

    res.json({ message: "Success" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

module.exports = router;
