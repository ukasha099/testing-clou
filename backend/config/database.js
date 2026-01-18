const { Sequelize } = require('sequelize');
// Note: dotenv is already loaded in server.js, but kept here for module independence
// In case this module is used independently, ensure dotenv is loaded
if (!process.env.DB_NAME) {
  require('dotenv').config();
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

module.exports = sequelize;
//fhfh