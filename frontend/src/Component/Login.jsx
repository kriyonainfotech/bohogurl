import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import BASE_URL from '../config'; // Import the global URL

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    const adminToken = localStorage.getItem('adminToken');

    if (userToken || adminToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Admin Login Logic (Fixed Credentials)
    if (email === "bohogurl@gmail.com" && password === "Admin@123") {
      setErrorMessage('');
      onLogin(true);
      localStorage.setItem("adminToken", "admin-token"); // Save admin token
      setSuccessMessage("Admin login successful!");
      navigate("/admin-dashboard"); // Redirect to admin dashboard
      return; // Stop further execution
    }

    // ✅ User Login Logic (Dynamic Credentials)
    try {
      const response = await axios.post(`${BASE_URL}/login`, { email, password }); // Use the global URL
      if (response.data.token) {
        localStorage.setItem("userToken", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        setIsAuthenticated(true);
        setSuccessMessage("Login successful!");
        onLogin(true);
        navigate("/product"); // Redirect to product page
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {isAuthenticated ? (
        <div>
          <h1>Welcome, You are logged in!</h1>
          <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded-md">Logout</button>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-2">LOG IN</h1>
          <h3 className="text-lg text-gray-500 mb-6">WELCOME TO BOHO GURL</h3>
          {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

          {/* Login Form */}
          <form className="w-full max-w-sm" onSubmit={handleSubmit}>
            <input
              type="text"
              name="email"
              placeholder="Email or Admin Username"
              value={email}
              onChange={handleChange}
              required
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              required
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400"
            />
            <Link
              to="/forgot-password"
              className="text-sm text-gray-600 hover:underline block mb-6 text-right"
            >
              Forgot your password?
            </Link>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300"
            >
              Login
            </button>
          </form>

          {/* Create Account Link */}
          <Link
            to="/Profile"
            className="text-sm text-gray-600 hover:underline mt-4"
          >
            Create New Account
          </Link>
        </>
      )}
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;