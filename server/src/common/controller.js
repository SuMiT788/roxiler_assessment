const CustomError = require("../../helpers/errorHandler");
const { initDatabase: initDatabaseService } = require("./service");
const {
  getItemsCountPerCategory: getItemsCountPerCategoryService,
} = require("../category/service");
const {
  getTotalSale,
  getTotalSold,
  getTotalNotSold,
  getItemsPerPriceRangeService,
} = require("../transaction/service");
const { convertArrayToKeyValueMap } = require("../../utils/common");

const initDatabase = async (req, res) => {
  try {
    await initDatabaseService();

    return res.send({ message: "Success", result: null });
  } catch (error) {
    console.log("-> initDatabase error:", error);
    if (error instanceof CustomError) {
      res.status(error.statusCode).send({ message: error.message });
    } else {
      res.status(500).send({ message: "Something went wrong!" });
    }
  }
};

const getCombinedResponse = async (req, res) => {
  try {
    if (!req.query.month) {
      throw new CustomError("month is required", 400);
    }

    const month = parseInt(req.query.month);

    const totalSaleResult = await getTotalSale(month);
    const totalSoldResult = await getTotalSold(month);
    const totalNotSoldResult = await getTotalNotSold(month);

    const statistics = {
      totalSale: totalSaleResult,
      totalSold: totalSoldResult,
      totalNotSold: totalNotSoldResult,
    };

    const itemsPerCategoryResult = await getItemsCountPerCategoryService(month);

    const itemsPerPriceRange = {};
    for (let i = 0; i < 10; i++) {
      let min = i * 100 + 1;
      const max = i === 9 ? null : min + 99;

      if (i === 0) {
        min = 0;
      }

      const itemsPerPriceRangeResult = await getItemsPerPriceRangeService(
        min,
        max,
        month
      );
      itemsPerPriceRange[`${min}-${max ? max : "above"}`] =
        itemsPerPriceRangeResult;
    }

    const formattedResult = convertArrayToKeyValueMap(
      itemsPerCategoryResult,
      "category",
      "item_count"
    );

    res.send({
      message: "Success",
      result: {
        statistics,
        itemsPerPriceRange,
        itemsPerCategory: formattedResult,
      },
    });
  } catch (error) {
    console.log("-> initDatabase error:", error);
    if (error instanceof CustomError) {
      res.status(error.statusCode).send({ message: error.message });
    } else {
      res.status(500).send({ message: "Something went wrong!" });
    }
  }
};

module.exports = { initDatabase, getCombinedResponse };
