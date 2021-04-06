require("dotenv").config({ path: "./.env" });
const express = require("express");
const { sequelize } = require("../models");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobsRoutes");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/uploads", express.static("src/uploads"));
app.use("/user", authRoutes);
app.use("/job", jobRoutes);

app.listen(port, async () => {
  console.log(`Listening on Port ${port}...`);
  await sequelize.sync({ force: true });
});
