import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import Navbar from "./Component/Navbar";
import Sidebar from "./Component/Sidebar";
import Collections from "./Component/Collections";
import Product from "./Component/Products";
import Product1 from "./Component/product1"; // Admin Product
import ProductDetails from "./Component/productdetails"; // Import ProductDetails
import Home from "./Component/Home";
import ParentComponent from "./Component/ParentComponent";
import Cart from "./Component/Cart";
import Orderinfo from "./Component/Orderinfo";
import Profile from "./Component/Profile";
import AdminLogin from "./Component/AdminLogin";
import Dashboard from "./Component/Dashboard";
import Orders from "./Component/Orders";
import Users from "./Component/Users"; 
import ThemeContextProvider from "./context/ThemeContextProvider";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";

/** 
 * User Layout (Navbar + Sidebar + Header + Footer)
 */
const UserLayout = () => (
  <>
    <Header />
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64"> {/* Adjust content for Sidebar */}
        <Navbar />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
    <Footer />
  </>
);

/** 
 * Admin Layout (Navbar + Sidebar) 
 */
const AdminLayout = () => (
  <div className="flex">
    <Sidebar />
    <div className="flex-1 ml-64 p-4"> {/* Adjust content for Sidebar */}
      <Navbar />
      <Outlet />
    </div>
  </div>
);

function App() {
  return (
    <ThemeContextProvider>
      <Router>
        <Routes>
          {/* Public Pages (Header + Footer) */}
          <Route path="/" element={<LayoutWithHeaderFooter><Home /></LayoutWithHeaderFooter>} />
          <Route path="/collections" element={<LayoutWithHeaderFooter><Collections /></LayoutWithHeaderFooter>} />
          <Route path="/product" element={<LayoutWithHeaderFooter><Product /></LayoutWithHeaderFooter>} />
          <Route path="/productdetails" element={<LayoutWithHeaderFooter><ProductDetails /></LayoutWithHeaderFooter>} /> {/* ProductDetails Page */}
          <Route path="/login" element={<LayoutWithHeaderFooter><ParentComponent /></LayoutWithHeaderFooter>} />
          <Route path="/cart" element={<LayoutWithHeaderFooter><Cart /></LayoutWithHeaderFooter>} />
          <Route path="/orderinfo" element={<LayoutWithHeaderFooter><Orderinfo /></LayoutWithHeaderFooter>} />
          <Route path="/profile" element={<LayoutWithHeaderFooter><Profile /></LayoutWithHeaderFooter>} />
          
          {/* Products with Header + Footer Only */}
          <Route path="/products" element={<LayoutWithHeaderFooter><Product /></LayoutWithHeaderFooter>} />

          <Route path="/admin-login" element={<AdminLogin />} />

          {/* User Routes (Navbar + Sidebar + Header + Footer) */}
          <Route element={<UserLayout />}>
            {/* Add other user routes here if needed */}
          </Route>

          {/* Admin Routes (Navbar + Sidebar) */}
          <Route element={<AdminLayout />}>
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/admin-orders" element={<Orders />} />
            <Route path="/admin-users" element={<Users />} />
            <Route path="/admin-products" element={<Product1 />} /> {/* Admin Product Page */}
          </Route>
        </Routes>
      </Router>
    </ThemeContextProvider>
  );
}

/** 
 * Public Layout (Header + Footer) 
 */
const LayoutWithHeaderFooter = ({ children }) => (
  <>
    <Header />
    <div className="p-4">{children}</div>
    <Footer />
  </>
);

export default App;