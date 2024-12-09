const { Router } = require("express");

const {
  getTransactions,
  getStatistics,
  getItemsPerPriceRange,
} = require("./controller");
const { isValidMonth } = require("../../helpers/middlewares");

const router = new Router();
router.get("/", isValidMonth, getTransactions);
router.get("/statistics", isValidMonth, getStatistics);
router.get("/items-count", isValidMonth, getItemsPerPriceRange);

module.exports = router;
