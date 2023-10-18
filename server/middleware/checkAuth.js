// Middleware để kiểm tra tính hợp lệ của token
const User = require("../models/user");

async function authenticateToken(req, res, next) {
  // Lấy chuỗi JWT từ tiêu đề "Authorization"
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Loại bỏ phần "Bearer"

  if (!token) {
    // Nếu không có token, trả về lỗi 401
    const error = new Error("Token không hợp lệ");
    error.statusCode = 401;
    return next(error);
  }

  try {
    // Giải mã token và gán thông tin người dùng vào req.user
    const currentUser = await User.findById(token);
    if (!currentUser) {
      const error = new Error("User không tồn tại");
      error.statusCode = 403;
      throw error;
    }
    req.user = currentUser;
    next();
  } catch (error) {
    // Xử lý lỗi khi token không hợp lệ hoặc hết hạn
    return next(error);
  }
}

module.exports = authenticateToken;
