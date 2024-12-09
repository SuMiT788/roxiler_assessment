const { executeQuery } = require("../../helpers/dbConnection");

const getItemsCountPerCategory = async (month) => {
  try {
    const selectItemsPerCategoryQuery = `SELECT
        c.name as category,
        COUNT(*) as item_count
      FROM mst_category c
      INNER JOIN product p on p.category_id = c.id
      GROUP BY c.name`;
    const selectItemsPerCategoryResult = await executeQuery(
      selectItemsPerCategoryQuery
    );

    return selectItemsPerCategoryResult;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getItemsCountPerCategory,
};
