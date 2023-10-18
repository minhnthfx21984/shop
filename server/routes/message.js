const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");

const messageController = require("../controllers/message");

router.put(
  "/chatrooms/addMessage",
  checkAuth,
  messageController.addMessagesByRoomId,
);

router.post(
  "/chatrooms/createNewRoom",
  checkAuth,
  messageController.createNewChatRoom,
);

router.get(
  "/chatrooms/getById",
  checkAuth,
  messageController.getMessageByRoomId,
);

router.get("/chatrooms/getAllRoom", checkAuth, messageController.getAllRoom);

module.exports = router;
