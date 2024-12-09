const {
  getItemsCountPerCategory: getItemsCountPerCategoryService,
} = require("./service");
const CustomError = require("../../helpers/errorHandler");
const { convertArrayToKeyValueMap } = require("../../utils/common");

const getItemsCountPerCategory = async (req, res) => {
  try {
    if (!req.query.month) {
      throw new CustomError("month is required", 400);
    }

    const month = parseInt(req.query.month);
    const result = await getItemsCountPerCategoryService(month);

    const formattedResult = convertArrayToKeyValueMap(
      result,
      "category",
      "item_count"
    );

    return res.send({ message: "Success", result: formattedResult });
  } catch (error) {
    console.log("-> getTransactions error:", error);
    if (error instanceof CustomError) {
      res.status(error.statusCode).send({ message: error.message });
    } else {
      res.status(500).send({ message: "Something went wrong!" });
    }
  }
};

module.exports = { getItemsCountPerCategory };
