const express = require("express");
const http = require("http");

require("dotenv").config();

const cors = require("cors");
const mongoose = require("./utils/dbConnect");

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = require("socket.io")(server, {
  transports: ["websocket"], // Chỉ sử dụng WebSocket
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("setRoomId", (roomId) => {
    socket.join(roomId);
  });

  socket.on("send_message", (data) => {
    // Gửi tin nhắn đến người dùng cụ thể dựa trên thông tin người dùng
    io.to(data.roomId).emit("receive_message", data.message);
    console.log(data);
  });

  socket.on("create_new_room", (roomId) => {
    io.emit("new_room", roomId);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const productRoute = require("./routes/product");
const userRoute = require("./routes/user");
const cartRoute = require("./routes/cart");
const emailRoute = require("./routes/email");
const checkoutRoute = require("./routes/checkout");
const messageRoute = require("./routes/message");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(productRoute);
app.use(userRoute);
app.use(cartRoute);
app.use(emailRoute);
app.use(checkoutRoute);
app.use(messageRoute);

app.use((err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json(err.message);
});

server.listen(process.env.PORT || 8000);
