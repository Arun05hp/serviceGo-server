require("dotenv").config({ path: "./.env" });
const express = require("express");
const { sequelize } = require("../models");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 5000;
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobsRoutes");
const dealsRoutes = require("./routes/dealsRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const contactRoutes = require("./routes/contactRoutes");
const { messages, storeMsg } = require("./routes/messageRoute");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/uploads", express.static("src/uploads"));
app.use("/user", authRoutes);
app.use("/job", jobRoutes);
app.use("/deal", dealsRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/notification", notificationRoutes);
app.use("/contact", contactRoutes);
app.use("/messages", messages);

io.on("connection", (socket) => {
  const id = socket.handshake.query.id;
  socket.join(id);
  socket.on("send-message", ({ sender, recipient, text, roomId }) => {
    socket.broadcast.to(recipient).emit("receive-message", {
      sender: id,
      text: text,
    });
    storeMsg(sender, text, roomId);
  });
});

server.listen(port, async () => {
  console.log(`Listening on Port ${port}...`);
  await sequelize.sync();
});
