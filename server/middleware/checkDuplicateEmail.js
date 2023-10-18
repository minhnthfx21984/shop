const User = require("../models/user"); // Import model User

const checkDuplicateEmail = async (req, res, next) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ email });

    if (user) {
      // Nếu tìm thấy người dùng có cùng email, ném lỗi
      const error = new Error("Email đã tồn tại.");
      error.statusCode = 422;
      throw error;
    }

    // Nếu không trùng lặp, tiếp tục xử lý yêu cầu
    next();
  } catch (error) {
    // Xử lý lỗi nếu có
    next(error);
  }
};

module.exports = checkDuplicateEmail;
