// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios"; // Ensure axios is imported
// import "../Style/productdetails.css";

// const ProductDetails = () => {
//   const { state } = useLocation(); // Retrieve product data passed from Product component
//   const { product } = state || {}; // Default to an empty object if no product
//   const navigate = useNavigate();

//   // Add product to cart
//   const addToCart = async (product) => {
//     const token = localStorage.getItem("userToken"); // Get token from localStorage

//     if (!token) {
//       alert("You need to login first.");
//       navigate("/login");
//       return;
//     }

//     const payload = {
//       productId: product._id, // Replace with your backend's expected field
//       quantity: 1, // Default quantity to 1; adjust as needed
//     };

//     try {
//       const response = await axios.post("http://localhost:3000/add", payload, {
//         headers: {
//           Authorization: `Bearer ${token}`, // Pass token in Authorization header
//         },
//       });
//       alert(response.data.message || "Product added to cart!");
//     } catch (error) {
//       console.error("Error adding item to cart:", error);
//       alert(error.response?.data?.message || "Failed to add item to cart.");
//     }
//   };

//   // Navigate back to the Product page
//   const goBack = () => {
//     navigate("/Product"); // Adjust this path if necessary
//   };

//   if (!product) {
//     return <p>Product not found!</p>;
//   }

//   return (
//     <div className="product-page">
//       {/* Left Side - Image */}
//       <div className="product-image-section">
//         <img
//           src={product.image || "https://via.placeholder.com/300"} // Default image if none exists
//           alt={product.name || "Product"}
//           className="product-page-image"
//         />
//       </div>

//       {/* Right Side - Details */}
//       <div className="product-info-section">
//         <h1 className="product-title">{product.name || "No Name"}</h1>
//         <p className="product-price">₹{product.price || "N/A"}</p>
//         <p className="product-description">
//           {product.description || "No description available."}
//         </p>

//         {/* Buttons */}
//         <div className="product-buttons">
//           <button
//             className="add-to-cart-btn"
//             onClick={() => addToCart(product)}
//           >
//             Add to Cart
//           </button>
//           <button className="back-btn" onClick={goBack}>
//             Back to Products
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios"; // Ensure axios is imported
// import "../Style/productdetails.css";

// const ProductDetails = () => {
//   const { state } = useLocation(); // Retrieve product data passed from Product component
//   const { product } = state || {}; // Default to an empty object if no product
//   const navigate = useNavigate();

//   // Add product to cart
//   const addToCart = async (product) => {
//     const token = localStorage.getItem("userToken"); // Ensure you're using userToken from localStorage
  
//     if (!token) {
//       alert("You need to login first.");
//       navigate("/login");
//       return;
//     }
  
//     try {
//       const decodedToken = JSON.parse(atob(token.split('.')[1]));
//       const user_id = decodedToken.id;
  
//       if (!user_id) {
//         console.error("User ID is missing in token");
//         return;
//       }
  
//       const payload = {
//         user_id, 
//         product_id: product.id,  // Ensure using _id here too
//         quantity: 1,
//       };
  
//       await axios.post("http://localhost:3000/cart/add", payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
  
//       alert("Product added to cart!");
//     } catch (error) {
//       console.error("Error adding item to cart:", error);
//       alert("Failed to add item to cart.");
//     }
//   };
  
//   // Navigate back to the Product page
//   const goBack = () => {
//     navigate("/Product"); // Adjust this path if necessary
//   };

//   if (!product) {
//     return <p>Product not found!</p>;
//   }

//   return (
//     <div className="product-page">
//       {/* Left Side - Image */}
//       <div className="product-image-section">
//         <img
//           src={`http://localhost:3000/${product.image_url}`}// Default image if none exists
//           alt={product.name || "Product"}
//           className="product-page-image"
//         />
//       </div>

//       {/* Right Side - Details */}
//       <div className="product-info-section">
//         <h1 className="product-title">{product.name || "No Name"}</h1>
//         <p className="product-price">₹{product.price || "N/A"}</p>
//         <p className="product-description">
//           {product.description || "No description available."}
//         </p>

//         {/* Buttons */}
//         <div className="product-buttons">
//           <button
//             className="add-to-cart-btn"
//             onClick={() => addToCart(product)}
//             disabled={!product.id && !product._id} // Disable if no valid product ID
//           >
//             Add to Cart
//           </button>
//           <button className="back-btn" onClick={goBack}>
//             Back to Products
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../config"; // Import BASE_URL

const ProductDetails = () => {
  const { state } = useLocation();
  const { product } = state || {};
  const navigate = useNavigate();

  // Add product to cart
  const addToCart = async (product) => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      alert("You need to login first.");
      navigate("/login");
      return;
    }

    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const user_id = decodedToken.id;

      if (!user_id) {
        console.error("User ID is missing in token");
        return;
      }

      const payload = {
        user_id,
        product_id: product.id,
        quantity: 1,
      };

      await axios.post(`${BASE_URL}/cart/add`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("Failed to add item to cart.");
    }
  };

  const goBack = () => {
    navigate("/Product");
  };

  if (!product) {
    return <p>Product not found!</p>;
  }

  return (
    <div className="p-4 sm:p-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={`${BASE_URL}/${product.image_url || "default-image.jpg"}`} // Use BASE_URL
            alt={product.name || "Product"}
            className="rounded-lg object-cover w-full h-auto max-w-md md:max-w-lg"
          />
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-2xl sm:text-3xl font-bold">{product.name || "No Name"}</h1>
          <p className="text-xl sm:text-2xl font-semibold text-gray-800">₹{product.price || "N/A"}</p>
          <p className="text-gray-600">{product.description || "No description available."}</p>

          {/* Button Section */}
          <div className="flex flex-wrap gap-4 mt-6">
            <button
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
              onClick={() => addToCart(product)}
              disabled={!product.id && !product._id}
            >
              Add to Cart
            </button>
            <button
              className="bg-white text-black px-4 py-2 border border-black rounded-md hover:bg-gray-100 transition"
              onClick={goBack}
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
