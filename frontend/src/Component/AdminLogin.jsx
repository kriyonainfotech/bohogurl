import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Handle admin login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/admin-login", { email, password });

      console.log(response.data); // Check if token is present in response
      const { adminId } = response.data;
      console.log(adminId);

      if (response.data.token) {
        // Store token in localStorage
        localStorage.setItem("adminToken", response.data.token);
        localStorage.setItem("adminId", adminId); 

        setIsAuthenticated(true);
        navigate("/Profile"); // Redirect to admin dashboard
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Invalid admin credentials. Please try again.");
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white ">
      <h1 className="text-3xl font-bold mb-2">ADMIN LOG IN</h1>
      <h3 className="text-lg text-gray-500 mb-6">ADMIN ACCESS ONLY</h3>
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Admin Email address"
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
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300"
        >
          Admin Login
        </button>
      </form>
      <Link
        to="/login"
        className="text-sm text-gray-600 hover:underline mt-4"
      >
        Back to User Login
      </Link>
    </div>
  );
};

export default AdminLogin;
