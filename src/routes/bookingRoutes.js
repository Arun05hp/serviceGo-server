const { Deals, User, Jobs, Bookings } = require("../../models");
const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();

async function fetchUserInfo(item, id) {
  const userDetails = await User.findOne({
    nest: true,
    where: {
      id: id,
    },
    include: [{ model: Jobs, as: "jobprofile", attributes: ["category"] }],
    attributes: ["id", "name", "mobileNumber", "profileImg"],
  });

  const dealsDetails = await Deals.findOne({
    raw: true,
    where: {
      id: item.dealid,
    },
  });
  return { ...item, profile: userDetails, dealsDetails };
}

router.get("/getAll/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let bookingsData = await Bookings.findAll({
      raw: true,
      where: {
        [Op.or]: [{ userid: id }, { workerid: id }],
      },
    });

    bookingsData = await Promise.all(
      bookingsData.map(async (item) => {
        return item.userid === id
          ? await fetchUserInfo(item, item.workerid)
          : await fetchUserInfo(item, item.userid);
      })
    );
    console.log(bookingsData);
    return res.json({
      message: "Success",
      bookingsData,
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
