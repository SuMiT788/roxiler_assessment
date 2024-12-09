const { Router } = require("express");

const { initDatabase, getCombinedResponse } = require("./controller");

const router = new Router();

router.use("/init-database", initDatabase);
router.use("/combined-response", getCombinedResponse);

module.exports = router;
