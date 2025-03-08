import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../config"; // Import BASE_URL

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state
  const navigate = useNavigate();

  // Fetch user info on page load
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/login"); // Redirect to login if not authenticated
    } else {
      // Fetch user profile data from server
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setError("Could not fetch user data. Please try again later.");
        } finally {
          setLoading(false);
        }
      };

      fetchUserProfile();
    }
  }, [navigate]);

  // Logout user
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <div className="profile-container p-4 sm:p-6">
      {loading ? (
        <h2 className="text-center text-gray-600">Loading profile...</h2>
      ) : error ? (
        <div className="text-center text-red-500">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
          >
            Retry
          </button>
        </div>
      ) : user ? (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">Your Profile</h1>
          <div className="space-y-3">
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>Address:</strong> {user.address}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md mt-6 hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      ) : (
        <h2 className="text-center text-gray-600">No user data found.</h2>
      )}
    </div>
  );
};

export default UserProfile;