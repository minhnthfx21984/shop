const Checkout = require("../models/checkout");

module.exports.getOrders = async (req, res, next) => {
  const reqData = req.query;

  try {
    const orders = await Checkout.find({ userId: reqData.idUser });
    const response = orders.map((order) => {
      return {
        _id: order._id,
        idUser: order.userId,
        fullname: order.name,
        phone: order.phone,
        address: order.address,
        total: order.totalPrice,
      };
    });

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports.getOrder = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);

  try {
    const order = await Checkout.findById(id).populate("cartList.productId");

    const response = {
      idUser: order.userId,
      fullname: order.name,
      phone: order.phone,
      address: order.address,
      total: order.totalPrice,
    };

    response.cart = order.cartList.map((cart) => {
      return {
        idProduct: cart.productId._id,
        img: cart.productId.img1,
        nameProduct: cart.productId.name,
        priceProduct: cart.productId.price,
        count: cart.count,
      };
    });

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Checkout.find();
    const response = orders.map((order) => {
      return {
        _id: order._id,
        idUser: order.userId,
        fullname: order.name,
        phone: order.phone,
        address: order.address,
        total: order.totalPrice,
      };
    });

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
