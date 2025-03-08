import React, { useEffect, useState } from "react";
import Card from "./Card";
import { FaBox, FaShoppingCart, FaUsers } from "react-icons/fa";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import BASE_URL from "../config"; // Import the global URL

// Register Chart.js components
ChartJS.register(LineElement, BarElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const Dashboard = () => {
  const [stats, setStats] = useState({ orders: 0, products: 0, users: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState({
    line: { labels: [], datasets: [] },
    bar: { labels: [], datasets: [] },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, productsRes, usersRes] = await Promise.all([
          axios.get(`${BASE_URL}/getOrder`), // Use the global URL
          axios.get(`${BASE_URL}/product`), // Use the global URL
          axios.get(`${BASE_URL}/getUsers`), // Use the global URL
        ]);

        // Log responses to check data format
        console.log("Orders Data:", ordersRes.data);
        console.log("Products Data:", productsRes.data);
        console.log("Users Data:", usersRes.data);

        if (!ordersRes.data || !productsRes.data || !usersRes.data) {
          throw new Error("Invalid API Response");
        }

        setStats({
          orders: ordersRes.data.length || 0,
          products: productsRes.data.length || 0,
          users: usersRes.data.length || 0,
        });

        setChartData({
          line: {
            labels: ordersRes.data.map((order) => order.date || "Unknown"),
            datasets: [
              {
                label: "Orders Over Time",
                data: ordersRes.data.map((order) => order.value || 0),
                borderColor: "#4CAF50",
                backgroundColor: "rgba(76, 175, 80, 0.2)",
                fill: true,
              },
            ],
          },
          bar: {
            labels: productsRes.data.map((product) => product.name || "Unknown"),
            datasets: [
              {
                label: "Product Sales",
                data: productsRes.data.map((product) => product.value || 0),
                backgroundColor: "rgba(255, 87, 34, 0.7)",
                borderColor: "#FF5722",
                borderWidth: 1,
              },
            ],
          },
        });
      } catch (err) {
        console.error("Error fetching data:", err.message);
        setError("⚠️ Failed to load data. Please check the API connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <TailSpin height="50" width="50" color="blue" ariaLabel="loading" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-5 text-lg font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">📊 Admin Dashboard</h2>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card icon={<FaShoppingCart className="text-blue-500" />} title="Orders" value={stats.orders} />
        <Card icon={<FaBox className="text-green-500" />} title="Products" value={stats.products} />
        <Card icon={<FaUsers className="text-orange-500" />} title="Users" value={stats.users} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">📈 Orders Over Time</h3>
          <Line
            data={chartData.line.labels.length > 0 ? chartData.line : {
              labels: ['No Data Available'],
              datasets: [{
                label: 'No Data',
                data: [0],
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                borderColor: 'rgba(0, 0, 0, 0.2)',
              }],
            }}
          />
        </div>
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">📊 Product Sales</h3>
          <Bar
            data={chartData.bar.labels.length > 0 ? chartData.bar : {
              labels: ['No Data Available'],
              datasets: [{
                label: 'No Data',
                data: [0],
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                borderColor: 'rgba(0, 0, 0, 0.2)',
              }],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;