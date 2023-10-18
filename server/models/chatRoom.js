const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema({
  message: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
});

const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);

module.exports = ChatRoom;
