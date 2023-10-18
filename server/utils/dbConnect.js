const mongoose = require("mongoose");

const dbUrl = process.env.DATABASE_URL;

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Kết nối cơ sở dữ liệu thất bại:"));
db.once("open", () => {
  console.log("Kết nối cơ sở dữ liệu thành công!");
});

module.exports = mongoose;
