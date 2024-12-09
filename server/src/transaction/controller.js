const {
  getTransactions: getTransactionsService,
  getTotalSale,
  getTotalSold,
  getTotalNotSold,
  getItemsPerPriceRangeService,
} = require("./service");
const CustomError = require("../../helpers/errorHandler");

const getTransactions = async (req, res) => {
  try {
    const result = await getTransactionsService(req.query);

    return res.send({ message: "Success", result });
  } catch (error) {
    console.log("-> getTransactions error:", error);
    if (error instanceof CustomError) {
      res.status(error.statusCode).send({ message: error.message });
    } else {
      res.status(500).send({ message: "Something went wrong!" });
    }
  }
};

const getStatistics = async (req, res) => {
  try {
    if (!req.query.month) {
      throw new CustomError("month is required", 400);
    }

    const month = parseInt(req.query.month);

    const totalSaleResult = await getTotalSale(month);
    const totalSoldResult = await getTotalSold(month);
    const totalNotSoldResult = await getTotalNotSold(month);

    return res.send({
      message: "Success",
      result: {
        totalSale: totalSaleResult,
        totalSold: totalSoldResult,
        totalNotSold: totalNotSoldResult,
      },
    });
  } catch (error) {
    console.log("-> getTransactions error:", error);
    if (error instanceof CustomError) {
      res.status(error.statusCode).send({ message: error.message });
    } else {
      res.status(500).send({ message: "Something went wrong!" });
    }
  }
};

const getItemsPerPriceRange = async (req, res) => {
  try {
    if (!req.query.month) {
      throw new CustomError("month is required", 400);
    }

    const month = parseInt(req.query.month);
    const result = {};
    for (let i = 0; i < 10; i++) {
      let min = i * 100 + 1;
      const max = i === 9 ? null : min + 99;

      if (i === 0) {
        min = 0;
      }

      const selectResult = await getItemsPerPriceRangeService(min, max, month);
      result[`${min}-${max ? max : "above"}`] = selectResult;
    }

    return res.send({
      message: "Success",
      result,
    });
  } catch (error) {
    console.log("-> getTransactions error:", error);
    if (error instanceof CustomError) {
      res.status(error.statusCode).send({ message: error.message });
    } else {
      res.status(500).send({ message: "Something went wrong!" });
    }
  }
};

module.exports = { getTransactions, getStatistics, getItemsPerPriceRange };
