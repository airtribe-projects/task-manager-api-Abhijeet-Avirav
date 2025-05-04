const { ApiError } = require("../utils/apiError");

const taskValidationMiddleware = (req, res, next) => {
  try {
    const payload = req.body;

    if (!payload.title) {
      return next(new ApiError("Title is required", 400));
    }

    if (!payload.description) {
      return next(new ApiError("Description is required", 400));
    }

    if (typeof payload.completed !== "boolean") {
      return next(new ApiError("Completed must be a boolean value", 400));
    }
    next();
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

module.exports = {
  taskValidationMiddleware,
};
