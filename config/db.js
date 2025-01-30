const { Sequelize } = require("sequelize");

// Create Sequelize instance
const sequelize = new Sequelize("jwellers", "root", "MySQL&&100", {
  host: "localhost",
  dialect: "mysql",
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully!"))
  .catch((error) =>
    console.error("Database connection failed:", error.message)
  );

module.exports = sequelize;
