const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

module.exports.createUser = async (req, res, next) => {
  const queryData = req.query;
  try {
    // Tạo user mới
    const newUser = new User({
      fullname: queryData.fullname,
      email: queryData.email,
      password: queryData.password,
      phone: queryData.phone,
    });

    await newUser.save();

    res.status(200).json("Tạo người dùng mới thành công.");
  } catch (error) {
    next(error); // Ném lỗi để xử lý chung ở middleware xử lý lỗi
  }
};

module.exports.loginUser = async (req, res, next) => {
  const queryData = req.query;

  try {
    // Tìm email
    const user = await User.findOne({ email: queryData.email });
    if (!user) {
      const error = new Error("Email không tồn tại.");
      error.statusCode = 401;
      throw error;
    }

    // So sánh password
    const isPasswordValid = await bcrypt.compare(
      queryData.password,
      user.password,
    );
    if (!isPasswordValid) {
      const error = new Error("Sai mật khẩu.");
      error.statusCode = 401;
      throw error;
    }

    // Lọc data
    const userData = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(userData, secretKey, { expiresIn: "1h" });

    res.status(200).json({
      message: "Đăng nhập thành công.",
      user: userData,
      token: token,
    });
  } catch (error) {
    next(error); // Ném lỗi để xử lý chung ở middleware xử lý lỗi
  }
};

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    const response = users.map((user) => {
      return {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
      };
    });

    res.status(200).json(response);
  } catch (error) {
    next(error); // Ném lỗi để xử lý chung ở middleware xử lý lỗi
  }
};
