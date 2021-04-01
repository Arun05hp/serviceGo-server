require("dotenv").config({ path: "./.env" });
const express = require("express");
const { sequelize } = require("../models");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const authRoutes = require("./routes/authRoutes");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/user", authRoutes);

app.listen(port, async () => {
  console.log(`Listening on Port ${port}...`);
  await sequelize.sync({ force: true });
  console.log("DB Sync");
});
