import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../config"; // Import the global URL

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");

  const fetchCartItems = useCallback(async () => {
    if (!token) {
      console.error("User not authenticated");
      return;
    }

    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.id;

      const response = await axios.get(`${BASE_URL}/cart/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCartItems(response.data.cartItems || []);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  }, [token]);

  const fetchProducts = useCallback(async () => {
    if (loading) return; // Avoid fetching while already loading

    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/product/?page=${currentPage}&limit=5` // Use the global URL
      );

      setProducts((prevProducts) => [
        ...prevProducts,
        ...response.data.filter(
          (newProduct) =>
            !prevProducts.some((product) => product.id === newProduct.id)
        ),
      ]);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, loading]);

  const addToCart = async (product) => {
    if (!token) {
      console.error("User not authenticated");
      return;
    }

    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.id;

      const existingProduct = cartItems.find(
        (item) => item.product_id === product.id
      );

      if (existingProduct) {
        const updatedCart = cartItems.map((item) =>
          item.product_id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        setCartItems(updatedCart);

        await axios.put(
          `${BASE_URL}/cart/update`, // Use the global URL
          {
            user_id: userId,
            product_id: product.id,
            quantity: existingProduct.quantity + 1,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          `${BASE_URL}/cart/add`, // Use the global URL
          {
            user_id: userId,
            product_id: product.id,
            quantity: 1,
            name: product.name,
            price: product.price,
            description: product.description,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setCartItems((prevCartItems) => [
          ...prevCartItems,
          { ...product, quantity: 1 },
        ]);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    if (!token) {
      console.error("User not authenticated");
      return;
    }

    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.id;

      await axios.delete(`${BASE_URL}/cart/remove`, { // Use the global URL
        data: { user_id: userId, product_id: productId },
        headers: { Authorization: `Bearer ${token}` },
      });

      setCartItems((prevCartItems) =>
        prevCartItems.filter(
          (item) => item.product_id.toString() !== productId.toString()
        )
      );
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const handleOrderInfoClick = () => {
    const subtotal = calculateSubtotal();
    navigate("/Orderinfo", { state: { cartItems, subtotal } });
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity, 10) || 0;
      return acc + price * quantity;
    }, 0);
  };

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const loadMoreProducts = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-5 p-5 bg-gray-100">
        {/* Cart Items Section */}
        <div className="flex-1 bg-white rounded-lg p-5 shadow-md">
          <h2 className="text-[35px] font-bold mb-5 text-gray-800" style={{ fontFamily: 'Cormorant Garamond' }}>
            Order Review
          </h2>
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div key={index} className="flex items-center mb-4">
                <div className="flex items-center">
                  <img
                    src={`${BASE_URL}/${item.image_url}`} // Use the global URL
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md mr-4"
                  />
                  <div className="flex-1">
                    <p className="text-lg font-semibold mb-1">{item.name}</p>
                    <p className="text-base text-gray-600">₹{item.price}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded mt-2"
                      onClick={() => removeFromCart(item.product_id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No items in your cart!</p>
          )}

          {/* Add More Products Section */}
          <h3 className="text-[27px] font-[400] mt-8" style={{ fontFamily: 'Cormorant Garamond' }}>
            Add more to your bag
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
            {products.slice(0, 5).map((product, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center">
                <img
                  src={`${BASE_URL}/${product.image_url}`} // Use the global URL
                  alt={product.name}
                  className="w-full h-[150px] object-cover rounded-md mb-3"
                />
                <p className="text-lg font-semibold">{product.name}</p>
                <p className="text-base text-gray-600">₹{product.price}</p>
                <button
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded mt-2"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
          {!loading && products.length > 5 && (
            <button
              onClick={loadMoreProducts}
              className="bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded mt-5"
            >
              Load More Products
            </button>
          )}
          {loading && <p>Loading...</p>}
        </div>

        {/* Order Total Section */}
        <div className="flex-none bg-white rounded-lg p-5 shadow-md">
          <center>
            <div>
              <h3 className="text-[25px] font-bold" style={{ fontFamily: 'Cormorant Garamond' }}>
                Order Total
              </h3>
              <hr className="my-3" />
              <p>{cartItems.length} items</p>
              <hr />
              <p>Subtotal: ₹{calculateSubtotal().toFixed(2)}</p>
              <br />
              <button
                onClick={handleOrderInfoClick}
                className="bg-black text-white py-3 px-6 rounded"
              >
                FILL OUT ORDER INFO
              </button>
            </div>
          </center>
        </div>
      </div>
    </>
  );
};

export default Cart;