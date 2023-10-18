const Cart = require("../models/cart");

// count: 2;
// idProduct: "62ccd4665eefc71539bb6b4c";
// idUser: "abc999";
// img: "https://firebasestorage.googleapis.com/v0/b/funix-way.appspot.com/o/xSeries%2FCCDN%2FReactJS%2FAssignment_Images%2FASM03_Resources%2Fiphone_13_4.jpeg?alt=media&token=dc72dde3-cfa4-4710-9493-ac2aa0ecf249";
// nameProduct: "Apple iPhone 13 Pro Max - Alpine Green";
// priceProduct: "29390000";

module.exports.getCarts = async (req, res, next) => {
  const reqData = req.query;
  try {
    const carts = await Cart.find({ userId: reqData.idUser }).populate(
      "productId",
      "img1 price name",
    );

    const resData = carts.map((cart) => {
      return {
        count: cart.count,
        idProduct: cart.productId._id.toString(),
        idUser: cart.userId.toString(),
        img: cart.productId.img1,
        nameProduct: cart.productId.name,
        priceProduct: cart.productId.price,
      };
    });

    res.status(200).json(resData); // Trả về thông tin giỏ hàng mới tạo
  } catch (error) {
    next(error);
  }
};

module.exports.addToCart = async (req, res, next) => {
  const reqData = req.query;
  console.log("add to cart");
  const data = {
    userId: reqData.idUser,
    productId: reqData.idProduct,
    count: parseInt(reqData.count),
  };

  try {
    // Tìm giỏ hàng dựa trên userId và productId
    const existingCartItem = await Cart.findOne({
      userId: reqData.idUser,
      productId: reqData.idProduct,
    });

    if (existingCartItem) {
      // Nếu đã tồn tại giỏ hàng, cập nhật số lượng (count)
      existingCartItem.count = data.count;
      await existingCartItem.save();
      res.status(200).json(existingCartItem); // Trả về thông tin giỏ hàng đã cập nhật
    } else {
      // Nếu không tồn tại giỏ hàng, tạo mới giỏ hàng
      const newCart = new Cart(data);
      await newCart.save();
      res.status(200).json(newCart); // Trả về thông tin giỏ hàng mới tạo
    }
  } catch (error) {
    next(error);
  }
};

module.exports.deleteCart = async (req, res, next) => {
  const reqData = req.query;
  try {
    const deleteCart = await Cart.deleteOne({
      userId: reqData.idUser,
      productId: reqData.idProduct,
    });

    res.status(200).json(deleteCart); // Trả về thông tin giỏ hàng mới tạo
  } catch (error) {
    next(error);
  }
};
