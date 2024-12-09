const { executeQuery } = require("../../helpers/dbConnection");

const getTransactions = async (query) => {
  try {
    const offset = (query.page - 1) * parseInt(query.per_page);
    const searchKey = query.search !== "" ? query.search : null;

    const countQuery = `SELECT 
        COUNT(*) as totalCount
      FROM transaction t
      INNER JOIN product p ON p.id = t.product_id
      INNER JOIN mst_category c ON c.id = p.category_id
      WHERE
        (
          ? IS NULL OR
          ? = '' OR
          p.title LIKE CONCAT('%', ?, '%') OR
          p.description LIKE CONCAT('%', ?, '%') OR
          p.price = ?
        )
      AND
        (? IS NULL OR MONTH(t.date_of_sale) = ?)`;

    const countResult = await executeQuery(countQuery, [
      searchKey,
      searchKey,
      searchKey,
      searchKey,
      searchKey,
      parseInt(query.month) || null,
      parseInt(query.month) || null,
    ]);

    const transactionSelectQuery = `SELECT 
        t.product_id as id,
        p.title,
        p.price,
        p.description,
        c.name,
        p.image,
        t.sold,
        t.date_of_sale
      FROM transaction t
      INNER JOIN product p ON p.id = t.product_id
      INNER JOIN mst_category c ON c.id = p.category_id
      WHERE
        (
          ? IS NULL OR
          ? = '' OR
          p.title LIKE CONCAT('%', ?, '%') OR
          p.description LIKE CONCAT('%', ?, '%') OR
          p.price = ?
        )
      AND
        (? IS NULL OR MONTH(t.date_of_sale) = ?)
      ORDER BY t.id
      LIMIT ?, ?`;

    const transactionsSelectResult = await executeQuery(
      transactionSelectQuery,
      [
        searchKey,
        searchKey,
        searchKey,
        searchKey,
        searchKey,
        parseInt(query.month) || null,
        parseInt(query.month) || null,
        offset || 0,
        parseInt(query.per_page) || 10,
      ]
    );

    return {
      data: transactionsSelectResult,
      totalCount: countResult[0].totalCount,
    };
  } catch (error) {
    throw error;
  }
};

const getTotalSale = async (month) => {
  try {
    const selectTotalSaleQuery = `SELECT
        SUM(p.price) as total_sale
      FROM transaction t
      INNER JOIN product p on p.id = t.product_id
      WHERE
        t.sold = 1 AND 
        (? IS NULL OR MONTH(t.date_of_sale) = ?)`;
    const selectTotalSaleResult = await executeQuery(selectTotalSaleQuery, [
      month,
      month,
    ]);

    return selectTotalSaleResult[0].total_sale;
  } catch (error) {
    throw error;
  }
};

const getTotalSold = async (month) => {
  try {
    const selectTotalSoldQuery = `SELECT
        COUNT(*) as total_sold
      FROM transaction t
      WHERE
        t.sold = 1 AND 
        (? IS NULL OR MONTH(t.date_of_sale) = ?)`;
    const selectTotalSoldResult = await executeQuery(selectTotalSoldQuery, [
      month,
      month,
    ]);

    return selectTotalSoldResult[0].total_sold;
  } catch (error) {
    throw error;
  }
};

const getTotalNotSold = async (month) => {
  try {
    const selectTotalNotSoldQuery = `SELECT
        COUNT(*) as total_sold
      FROM transaction t
      WHERE
        t.sold = 0 AND 
        (? IS NULL OR MONTH(t.date_of_sale) = ?)`;
    const selectTotalNotSoldResult = await executeQuery(
      selectTotalNotSoldQuery,
      [month, month]
    );

    return selectTotalNotSoldResult[0].total_sold;
  } catch (error) {
    throw error;
  }
};

const getItemsPerPriceRangeService = async (min, max, month) => {
  try {
    const selectTotalNotSoldQuery = `SELECT
        COUNT(*) as total_sold
      FROM transaction t
        INNER JOIN product p ON p.id = t.product_id
      WHERE
        p.price >= ? AND
        (? IS NULL OR p.price <= ?) AND
        (? IS NULL OR MONTH(t.date_of_sale) = ?)`;
    const selectTotalNotSoldResult = await executeQuery(
      selectTotalNotSoldQuery,
      [min, max, max, month, month]
    );

    return selectTotalNotSoldResult[0].total_sold;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getTransactions,
  getTotalSale,
  getTotalSold,
  getTotalNotSold,
  getItemsPerPriceRangeService,
};
