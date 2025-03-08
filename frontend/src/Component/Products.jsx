import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../config"; // Import BASE_URL

const Product = () => {
  const [products, setProducts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/product`); // Use BASE_URL
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else if (response.data && Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        } else {
          console.error("Products data is not in the expected format");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    const token = localStorage.getItem("userToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const addToCart = async (product) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const token = localStorage.getItem("userToken");
    if (!token) {
      console.error("Token is missing");
      return;
    }

    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const user_id = decodedToken.id;

      if (!user_id) {
        console.error("User ID is missing in token");
        return;
      }

      await axios.post(
        `${BASE_URL}/cart/add`, // Use BASE_URL
        {
          user_id,
          product_id: product.id,
          quantity: 1,
          price: product.price,
          name: product.name,
          description: product.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("Failed to add item to cart. Please try again later.");
    }
  };

  const viewProductDetails = (product) => {
    navigate("/product-details", { state: { product } }); // Navigate to product-details page
  };

  return (
    <>
      <div className="p-4 sm:p-6">
        {/* Header Section */}
        <center>
          <p className="text-3xl sm:text-4xl font-serif font-bold">Necklaces</p>
          <p className="text-sm sm:text-lg font-serif text-gray-500 mt-2 font-[Karla]">
            Lorem ipsum dolor sit amet.
          </p>
        </center>

        {/* Sort List */}
        <div className="flex justify-center mt-6 sm:mt-8">
          <ul className="flex flex-wrap justify-center space-x-4 sm:space-x-8 text-base sm:text-lg font-serif">
            <li className="text-gray-500 font-[Karla]">SORT BY.</li>
            <li className="text-black hover:text-gray-700 cursor-pointer font-[Karla]">
              <a href="#">Popularity</a>
            </li>
            <li className="text-black hover:text-gray-700 cursor-pointer font-[Karla]">
              <a href="#">Type</a>
            </li>
            <li className="text-black hover:text-gray-700 cursor-pointer font-[Karla]">
              <a href="#">Gemstone</a>
            </li>
            <li className="text-black hover:text-gray-700 cursor-pointer font-[Karla]">
              <a href="#">Price</a>
            </li>
          </ul>
        </div>

        <hr className="my-4 sm:my-6 border-gray-300" />

        {/* Product Grid */}
        <section>
          {loading ? (
            <p className="text-center text-gray-600">Loading products...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {products.length > 0 ? (
                products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white shadow-md rounded-md overflow-hidden w-full cursor-pointer"
                  >
                    {/* Image Section */}
                    <div onClick={() => viewProductDetails(product)}>
                      <img
                        src={`${BASE_URL}/${product.image_url || "default-image.jpg"}`} // Use BASE_URL
                        alt={product.name}
                        className="w-full h-48 sm:h-56 lg:h-64 object-contain sm:object-cover rounded-md transition-transform duration-300 hover:scale-105"
                      />
                    </div>

                    {/* Product Details Section */}
                    <div className="mt-4 px-4">
                      <p className="text-base sm:text-lg font-medium">
                        {product.name}
                      </p>
                      <p className="text-gray-600 text-sm sm:text-base font-semibold">
                        ₹{product.price}
                      </p>
                      <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    {/* Button Group */}
                    <div className="mt-4 px-4 pb-4 flex justify-between">
                      <button
                        className="bg-black text-white py-2 px-3 sm:px-4 rounded-md text-xs sm:text-sm hover:bg-gray-800 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent event bubbling
                          addToCart(product);
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600 col-span-full">
                  No products available
                </p>
              )}
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default Product;