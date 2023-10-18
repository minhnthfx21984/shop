const Checkout = require("../models/checkout");
const Cart = require("../models/cart");
const Product = require("../models/product");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // Địa chỉ email Gmail của bạn
    pass: process.env.EMAIL_PASSWORD, // Mật khẩu email Gmail của bạn
  },
});

module.exports.sendEmail = async (req, res, next) => {
  const reqData = req.query;
  const cartList = JSON.parse(reqData.cartList).map((cart) => {
    return {
      productId: cart.idProduct,
      count: cart.count,
    };
  });

  // console.log(reqData);

  const checkoutData = {
    userId: reqData.idUser,
    name: reqData.fullname,
    address: reqData.address,
    phone: reqData.phone,
    cartList: cartList,
    totalPrice: reqData.totalPrice,
    email: reqData.to,
  };

  async function createTable(checkoutData) {
    let tableProduct = `
      <table border="1">
        <thead>
          <tr>
            <th>Tên Sản Phẩm</th>
            <th>Hình Ảnh</th>
            <th>Giá</th>
            <th>Số Lượng</th>
            <th>Thành Tiền</th>
          </tr>
        </thead>
      <tbody>`;

    for (const cart of checkoutData.cartList) {
      try {
        const product = await Product.findById(cart.productId);
        tableProduct += `
          <tr>
            <td>${product.name}</td>
            <td><img src="${
              product.img1
            }" style="width: 50px; height: auto;" /></td>
            <td>${product.price}</td>
            <td>${cart.count}</td>
            <td>${Number(product.price) * cart.count}</td>
          </tr>
        `;
      } catch (error) {
        console.error("Lỗi khi lấy thông tin sản phẩm:", error);
      }
    }

    tableProduct += "</tbody></table>";
    return tableProduct;
  }

  const contactHtml = `
  <p>Phone: ${checkoutData.phone}</p>
  <p>Address: ${checkoutData.address}</p>
`;
  const tableHtml = await createTable(checkoutData);

  const totalPriceHtml = `
    <h3>Tổng Thanh Toán: ${checkoutData.totalPrice}</h3>
    <h4>Cảm ơn bạn!</h4>
  `;

  const html = contactHtml + tableHtml + totalPriceHtml;

  const mailOptions = {
    from: process.env.EMAIL, // Địa chỉ email người gửi (phải trùng với user ở trên)
    to: checkoutData.email, // Địa chỉ email người nhận
    subject: `Thông báo đặt hàng`,
    text: `Xin chào ${checkoutData.name}`,
    html: html,
  };

  try {
    const newCheckout = new Checkout(checkoutData);
    await newCheckout.save();
    await Cart.deleteMany({
      userId: reqData.idUser,
    });
    await transporter.sendMail(mailOptions);

    res.status(200).json(newCheckout); // Trả về thông tin checkout
  } catch (error) {
    next(error);
  } finally {
    // Đóng transporter để giải phóng tài nguyên
    transporter.close();
  }
};
