const { Router } = require("express");

const { getItemsCountPerCategory } = require("./controller");
const { isValidMonth } = require("../../helpers/middlewares");

const router = new Router();
router.get("/item-count", isValidMonth, getItemsCountPerCategory);

module.exports = router;
