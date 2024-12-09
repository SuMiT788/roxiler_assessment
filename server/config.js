require("dotenv").config();

const port = process.env.PORT;
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

module.exports = {
  port,
  dbHost,
  dbUser,
  dbPassword,
  dbName,
};
