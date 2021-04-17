const { Deals, Payment, Bookings } = require("../../models");
const { v4: uuidv4 } = require("uuid");
const express = require("express");

const router = express.Router();

router.post("/pay", async (req, res) => {
  const {
    userid,
    workerid,
    amount,
    dealid,
    cardnumber,
    expiry,
    cvv,
  } = req.body;
  const transactionid = uuidv4();
  const cardNo = "12345678912345";
  const expiryDate = "17/21";
  const cvvNo = "256";

  try {
    const deal = await Deals.findOne({
      where: {
        id: dealid,
      },
    });

    if (!deal) return res.status(400).json({ message: "Deal not found" });

    if (cardNo === cardnumber && expiryDate === expiry && cvvNo === cvv) {
      const paymentDetails = await Payment.create({
        userid,
        workerid,
        amount,
        dealid,
        transactionid,
        status: "1",
      });

      const deal = await Deals.findOne({
        where: {
          id: dealid,
        },
      });

      Object.assign(deal, {
        status: "1",
      });
      await deal.save();

      await Bookings.create({
        userid,
        workerid,
        dealid,
        transactionid,
        status: "0",
      });

      res.json({
        message: "Success",
        payment: paymentDetails,
      });
    } else {
      const paymentDetails = await Payment.create({
        userid,
        workerid,
        amount,
        dealid,
        transactionid,
        status: "0",
      });
      res
        .status(400)
        .json({ message: "Transaction failed", payment: paymentDetails });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
});
module.exports = router;
