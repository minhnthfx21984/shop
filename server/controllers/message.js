const Message = require("../models/message");
const ChatRoom = require("../models/chatRoom");

module.exports.addMessagesByRoomId = async (req, res, next) => {
  const bodyData = req.body;

  try {
    const newMessage = new Message(bodyData);
    await newMessage.save();

    await ChatRoom.findOneAndUpdate(
      { _id: bodyData.roomId }, // Điều kiện tìm kiếm cuộc trò chuyện cụ thể
      { $push: { message: newMessage._id } }, // Thêm message vào danh sách message của cuộc trò chuyện
      { new: true },
    );

    res.status(200).json(newMessage.message);
  } catch (error) {
    next(error);
  }
};

module.exports.createNewChatRoom = async (req, res, next) => {
  try {
    const chatRoom = new ChatRoom({
      message: [],
    });
    const newChatRoom = await chatRoom.save();

    res.status(200).json(newChatRoom._id);
  } catch (error) {
    next(error);
  }
};

module.exports.getMessageByRoomId = async (req, res, next) => {
  const reqData = req.query;
  try {
    const messages = await Message.find({ roomId: reqData.roomId });
    const response = {
      content: messages,
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports.getAllRoom = async (req, res, next) => {
  const reqData = req.query;
  try {
    const rooms = await ChatRoom.find();

    res.status(200).json(rooms.reverse());
  } catch (error) {
    next(error);
  }
};
