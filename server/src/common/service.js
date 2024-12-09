const axios = require("axios");

const { executeQuery } = require("../../helpers/dbConnection");

const initDatabase = async () => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );

    const categoriesSet = new Set();
    for (let i = 0; i < response.data.length; i++) {
      const item = response.data[i];

      if (!categoriesSet.has(item.category)) {
        const categoriesInsertQuery =
          "INSERT INTO mst_category (name) VALUES (?)";
        await executeQuery(categoriesInsertQuery, [item.category]);

        categoriesSet.add(item.category);
      }

      const categorySelectQuery = "SELECT * FROM mst_category WHERE name=?";
      const categorySelectResult = await executeQuery(
        categorySelectQuery,
        item.category
      );

      const productInsertQuery = `INSERT INTO product (
          title, 
          price, 
          description, 
          category_id, 
          image
        ) 
        VALUES (?, ?, ?, ?, ?)`;
      const productInsertResult = await executeQuery(productInsertQuery, [
        item.title,
        parseFloat(item.price.toFixed(2)),
        item.description,
        categorySelectResult[0].id,
        item.image,
      ]);

      const transactinsInsertQuery =
        "INSERT INTO transaction (product_id, sold, date_of_sale) VALUES (?, ?, ?)";
      await executeQuery(transactinsInsertQuery, [
        productInsertResult.insertId,
        item.sold,
        item.dateOfSale,
      ]);
    }

    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = { initDatabase };
