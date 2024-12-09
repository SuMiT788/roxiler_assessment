const { Router } = require("express");

const commonRouter = require("./common/route");
const transactionRouter = require("./transaction/route");
const categoryRouter = require("./category/route");

const router = new Router();

router.use("/", commonRouter);
router.use("/transaction", transactionRouter);
router.use("/category", categoryRouter);

module.exports = router;
