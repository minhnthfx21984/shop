const Product = require("../models/product");

module.exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

module.exports.getProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

module.exports.getPaginationProducts = async (req, res, next) => {
  const reqData = req.query;

  try {
    // Tạo một đối tượng truy vấn để tìm sản phẩm
    const query = {};

    // Nếu có danh mục được chỉ định trong yêu cầu, thêm điều kiện tìm kiếm theo danh mục
    if (reqData.category) {
      if (reqData.category !== "all") {
        query.category = reqData.category;
      }
    }

    // Nếu có từ khóa tìm kiếm theo tên sản phẩm, thêm điều kiện tìm kiếm theo tên sản phẩm
    if (reqData.search) {
      // Sử dụng biểu thức chính quy để tìm kiếm không phân biệt chữ hoa chữ thường
      query.name = new RegExp(reqData.search, "i");
    }

    // Sử dụng truy vấn để tìm sản phẩm dựa trên các điều kiện đã thiết lập
    const products = await Product.find(query);

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
