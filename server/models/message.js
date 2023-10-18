const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  message: { type: String, required: true },
  is_admin: { type: Boolean, require: true },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "ChatRoom" },
  date: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
