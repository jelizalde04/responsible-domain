const { Sequelize } = require("sequelize");

// Carga las variables de entorno
require("dotenv").config();

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: "postgres",
  port: process.env.DB_PORT,

  dialectOptions: {
    ssl: {
      require: true, 
      rejectUnauthorized: false 
    }
  }
});

module.exports = sequelize;
