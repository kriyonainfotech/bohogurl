const express = require("express");
const cors = require("cors");
const app = express();
const sequelize = require("./config/db");
const { User, Product, Cart, Order, OrderItems } = require("./models");
const multer = require("multer");
const path = require("path");
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads")); // Serve uploaded files

require("dotenv").config();
// Middleware setup
app.use(cors());
app.use(express.json()); // To parse incoming JSON requests

const authroutes = require("./routes/authroutes");
const productRoutes = require("./routes/productRoute");
const orderRoutes = require("./routes/orderRoute");
const cartRoutes = require("./routes/cartRoute");
const adminRoutes = require("./routes/adminRoutes");
// Routesx
app.use("/", authroutes);
app.use("/product", productRoutes);
app.use("/", orderRoutes);
app.use("/cart", cartRoutes);
app.use("/", adminRoutes);

// Sync DB and start server
sequelize
  .sync({ force: false }) // 'force: true' will drop the tables and recreate them
  .then(() => {
    console.log("Database synced!");
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });
app.listen(3000, () => {
  console.log("Server running on https://bohogurl.org");
});
