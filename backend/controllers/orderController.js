const Order=require('./../models/orderModel')

const createOrder = async (req, res) => {
  try {
    const { email, phone, address, city, state, zipcode, shipppingAdd, shipCity, shipState, shipZipcode,orderTotal } = req.body;

    // Save the order to the database
    const order = await Order.create({
      email,
      phone,
      address,
      city,
      state,
      zipcode,
      shipppingAdd,
      shipCity,
      shipState,
      shipZipcode,
      orderTotal // Save subtotal as orderTotal
    });

    res.status(201).json({ message: "Order saved successfully", order });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ message: "Failed to save order", error });
  }
};

const getOrders=async(req,res)=>{
  try {
    const orders = await Order.findAll({
      attributes:['id','email','phone','address','shipppingAdd','shipCity','shipState','shipZipcode','orderTotal']
    })
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send('Server error');
  }
}
module.exports = { createOrder,getOrders};
