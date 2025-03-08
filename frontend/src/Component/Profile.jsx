import React, { useState, useEffect } from 'react';
import man from '../Images/man.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    pincode: ""
  });

  const [message, setMessage] = useState(""); // To display success/error messages
  const token = localStorage.getItem("token"); // Assume token is stored in localStorage after login
  const navigate = useNavigate(); // For navigation to other pages

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://bohogurl.org/signup",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
          "Content-Type": "application/json",
        }
      );      
      setFormData({ name: "", email: "", phone: "", password: "", address: "", pincode: "" });
      setMessage("Signup Successful!");
    } catch (error) {
      console.error("Error in Signup:", error);
      setMessage("Failed to Signup profile. Please try again.");
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/login'); // Redirect user to login page
  };

  return (
    <><br /><br /><br />
     <div className="profile-container flex flex-col md:flex-row items-start bg-gray-100 min-h-screen p-4 mt-30">
      {/* Sidebar */}
      <div className="sidebar bg-white shadow-md rounded-lg p-6 flex flex-col items-center w-full md:w-1/3 lg:w-1/4 mb-6 md:mb-0 mt-10">
        <div className="profile-header flex items-center mb-6">
          <img src={man} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
          <h2 className="ml-4 text-xl font-semibold">Hi, {formData.name || "User"}</h2>
        </div>
        <div className="profile-menu w-full">
          <div className="menu-item active flex items-center p-3 rounded-lg hover:bg-red-300 cursor-pointer">
            <i className="fa-regular fa-user text-lg mr-3"></i>
            <span className=" text-center md:text-center">My Profile</span>
          </div>
          <div
            className="menu-item flex items-center justify-start p-3 rounded-lg hover:bg-red-300 cursor-pointer"
            onClick={handleLogout}
          >
            <i className="fa-solid fa-right-from-bracket text-lg mr-3"></i>
            <span className="text-base">Logout</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="content bg-white shadow-md rounded-lg p-6 w-full md:w-2/3 lg:w-3/4 ml-0 md:ml-10 mt-10">
        <form className="form space-y-6" onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="form-row grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div className="form-group">
              <label htmlFor="name" className="block font-semibold mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-[10px] py-[10px] focus:outline-none focus:ring focus:ring-gray-400"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="block font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-[10px] py-[10px] focus:outline-none focus:ring focus:ring-gray-400"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="form-row grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div className="form-group">
              <label htmlFor="phone" className="block font-semibold mb-[10px]">Mobile No.</label>
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="Mobile No."
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-[10px] py-[10px] focus:outline-none focus:ring focus:ring-gray-400"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="block font-semibold mb-[10px]">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-[10px] py-[10px] focus:outline-none focus:ring focus:ring-gray-400"
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className='flex gap-x-[20px] gap-y-[20px]'>
            {/* Address */}
            <div className='form-group'>
              <label htmlFor='address' className='block font-semibold mb-[10px]'>Full Address</label>
              <textarea
                rows={3}
                name='address'
                id='address'
                placeholder='Address'
                value={formData.address}
                onChange={handleChange}
                required
                className='md:w-[510px] w-full border border-gray-300 rounded-md px-[10px] py-[10px] resize-none focus:outline-none focus:ring focus:ring-gray-400'
              ></textarea>
            </div>

            {/* Pincode */}
            <div className='form-group'>
              <label htmlFor='pincode' className='block font-semibold mb-[10px]'>Pincode</label>
              <input
                type='text'
                name='pincode'
                id='pincode'
                placeholder='Pincode'
                value={formData.pincode}
                onChange={handleChange}
                required
                className='md:w-[510px] w-full border border-gray-300 rounded-md px-[10px] py-[10px] focus:outline-none focus:ring focus:ring-gray-400'
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='bg-black text-white px-[20px] py-[10px] rounded-md hover:bg-opacity-[80%] transition duration-[300ms]'
          >
            Save
          </button>

          {message && (
            <p className='text-green-500 mt-[10px]'>{message}</p>
          )}
        </form>
      </div>
    </div>
    </>
  );
};

export default Profile;