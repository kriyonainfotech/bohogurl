import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../config'; // Import BASE_URL

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/getOrder`); // Use BASE_URL
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      alert("Failed to fetch orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return `₹${value.toLocaleString()}`;
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setStatus(order.status);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setUpdating(false);
  };

  const handleUpdateOrder = async () => {
    if (!selectedOrder) return;

    try {
      setUpdating(true);
      await axios.put(`${BASE_URL}/updateOrder/${selectedOrder._id}`, { status }); // Use BASE_URL
      setUpdating(false);
      alert("Order updated successfully!");
      fetchOrders();
      handleCloseModal();
    } catch (error) {
      console.error("Failed to update order:", error);
      setUpdating(false);
      alert("Failed to update order. Please try again later.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">All Orders</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <table className="table-auto w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="border p-2">Order ID</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">Order Total</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id}>
                  <td className="border p-2">{order.id}</td>
                  <td className="border p-2">{order.email}</td>
                  <td className="border p-2">{order.phone}</td>
                  <td className="border p-2">
                    {order.shipppingAdd}, {order.shipCity}, {order.shipState} - {order.shipZipcode}
                  </td>
                  <td className="border p-2">{formatCurrency(order.orderTotal)}</td>
                  <td className="border p-2">{order.status || "Pending"}</td>
                  <td className="border p-2">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                      onClick={() => handleViewDetails(order)}
                    >
                      View & Update
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h3 className="text-xl mb-4">Order Details</h3>
            <p><strong>Order ID:</strong> {selectedOrder._id}</p>
            <p><strong>Email:</strong> {selectedOrder.email}</p>
            <p><strong>Phone:</strong> {selectedOrder.phone}</p>
            <p><strong>Shipping Address:</strong> {selectedOrder.shipppingAdd}, {selectedOrder.shipCity}, {selectedOrder.shipState} - {selectedOrder.shipZipcode}</p>
            <p><strong>Order Total:</strong> {formatCurrency(selectedOrder.orderTotal)}</p>
            <p><strong>Items:</strong></p>
            <ul>
              {selectedOrder.items && selectedOrder.items.length > 0 ? (
                selectedOrder.items.map((item, index) => (
                  <li key={index}>
                    {item.name} x {item.quantity} - {formatCurrency(item.price * item.quantity)}
                  </li>
                ))
              ) : (
                <li>No items available</li>
              )}
            </ul>

            <div className="mt-4">
              <label className="block mb-2 font-bold">Update Status:</label>
              <select
                className="border p-2 rounded-md w-full"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={handleUpdateOrder}
                disabled={updating}
              >
                {updating ? "Updating..." : "Update Order"}
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;