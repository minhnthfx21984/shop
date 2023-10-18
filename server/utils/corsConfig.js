// corsConfig.js
const cors = require("cors");

const corsOptions = {
  origin: process.env.ALLOW_ORIGIN, // Thay thế origin này bằng nguồn bạn muốn cho phép truy cập
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Cho phép sử dụng cookie và xác thực HTTP
};

module.exports = cors();
