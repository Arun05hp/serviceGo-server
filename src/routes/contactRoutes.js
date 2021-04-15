const { Contacts, User, Jobs } = require("../../models");
const express = require("express");

const router = express.Router();

async function fetchUserInfo(item) {
  const userDetails = await User.findOne({
    raw: true,
    where: {
      id: item.id,
    },
    include: [{ model: Jobs, as: "jobprofile", attributes: ["category"] }],
    attributes: ["id", "name", "mobileNumber", "profileImg"],
  });
  return { ...item, ...userDetails };
}

router.get("/getAll/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await Contacts.findAll({
      raw: true,
      where: {
        userid: id,
      },
    });
    let contactsList = JSON.parse(contact[0].contacts);
    contact[0].contacts = await Promise.all(
      contactsList.map(async (item) => {
        return await fetchUserInfo(item);
      })
    );

    return res.json({
      message: "Success",
      contacts: contact,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
});

module.exports = router;
