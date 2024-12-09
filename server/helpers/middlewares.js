const CustomError = require("./errorHandler");

const isValidMonth = (req, res, next) => {
  try {
    const month = parseInt(req.query.month);

    if (month) {
      if (typeof month === "number" && month >= 1 && month <= 12) {
        next();
      } else {
        throw new CustomError("Invalid month value, expected (1-12)", 400);
      }
    } else {
      next();
    }
  } catch (error) {
    console.log("-> isValidMonth error:", error);
    if (error instanceof CustomError) {
      res.status(error.statusCode).send({ message: error.message });
    } else {
      res.status(500).send({ message: "Something went wrong!" });
    }
  }
};

module.exports = { isValidMonth };
