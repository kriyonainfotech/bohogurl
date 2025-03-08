const { Sequelize } = require('sequelize');

// Create Sequelize instance
const sequelize = new Sequelize('jwellers2', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port:3306,
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => console.log('Database connected successfully!'))
  .catch((error) => console.error('Database connection failed:', error.message));

module.exports = sequelize; 