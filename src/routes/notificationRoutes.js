const { Contacts, Notification } = require("../../models");
const { v4: uuidv4 } = require("uuid");
const express = require("express");

const router = express.Router();

router.post("/create", async (req, res) => {
  const { senderId, forId } = req.body;
  try {
    if (
      await Notification.findOne({
        where: { senderId: senderId, forId: forId },
      })
    ) {
      return res.status(400).json({ message: "Already Requested" });
    }

    if (
      !(await Contacts.findOne({
        where: { userid: senderId },
      }))
    ) {
      let contData = {
        userid: senderId,
        uuid: uuidv4(),
        contacts: null,
      };
      await Contacts.create(contData);
    }

    await Notification.create(req.body);

    res.json({ message: "Success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
});

router.post("/accept/:id", async (req, res) => {
  let owner = {};
  let requester = {};
  let roomId = uuidv4();
  try {
    const id = req.params.id;
    const data = req.body;
    const notifi = await Notification.findByPk(id);
    if (!notifi) return res.status(400).json({ message: "Not Found" });

    requester = await Contacts.findOne({
      where: { userid: data.receiverId },
    });

    owner = await Contacts.findOne({
      where: { userid: data.senderId },
    });

    if (!owner) {
      let contData = {
        userid: data.senderId,
        uuid: uuidv4(),
        contacts: null,
      };
      owner = await Contacts.create(contData);
    }

    if (owner.dataValues.contacts == "" || owner.dataValues.contacts == null) {
      owner.contacts = JSON.stringify([
        {
          id: requester.dataValues.userid,
          uuid: requester.dataValues.uuid,
          roomId: roomId,
        },
      ]);
    } else {
      if (
        owner.dataValues.contacts.filter(
          (item) => item.id === requester.dataValues.userid
        ).length < 1
      ) {
        owner.contacts = JSON.stringify([
          ...owner.dataValues.contacts,
          {
            id: requester.dataValues.userid,
            uuid: requester.dataValues.uuid,
            roomId: roomId,
          },
        ]);
      }
    }

    await owner.save();

    if (
      requester.dataValues.contacts == "" ||
      requester.dataValues.contacts == null
    ) {
      requester.contacts = JSON.stringify([
        {
          id: owner.dataValues.userid,
          uuid: owner.dataValues.uuid,
          roomId: roomId,
        },
      ]);
    } else {
      if (
        requester.dataValues.contacts.filter(
          (item) => item.id === owner.dataValues.userid
        ).length < 1
      ) {
        requester.contacts = JSON.stringify([
          ...requester.dataValues.contacts,
          {
            id: owner.dataValues.userid,
            uuid: owner.dataValues.uuid,
            roomId: roomId,
          },
        ]);
      }
    }
    await requester.save();
    Object.assign(notifi, data);
    await notifi.save();

    res.json({ message: "Success" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.get("/getAll/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const notifi = await Notification.findAll({
      where: {
        receiverId: id,
      },
    });

    return res.json({
      message: "Success",
      notifications: notifi,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
});

router.post("/reject/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const notifi = await Notification.findByPk(id);
    if (!notifi) return res.status(400).json({ message: "Not Found" });

    Object.assign(notifi, data);
    await notifi.save();

    res.json({ message: "Success" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.delete("/clear/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Notification.destroy({
      where: {
        id: id,
      },
    });

    res.json({ message: "Success" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

module.exports = router;
