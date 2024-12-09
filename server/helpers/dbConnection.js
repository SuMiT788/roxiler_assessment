const mysql = require("mysql2/promise");

const { dbHost, dbUser, dbPassword, dbName } = require("../config");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbName,
});

// Function to check if the connection is successful
async function checkConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("-> Database connection successful");
    connection.release(); // Release the connection back to the pool
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error; // Propagate the error for further handling if needed
  }
}

checkConnection();

async function executeQuery(query, params = []) {
  try {
    const [result, fields] = await pool.query(query, params);

    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = { executeQuery };
