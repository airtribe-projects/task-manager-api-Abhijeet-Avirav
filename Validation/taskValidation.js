const { ApiError } = require("../utils/apiError");

const validateTask = (req, res, next) => {
  try {
    const payload = req.body;
    console.log(typeof payload.completed);
    if (!payload.title) {
      next(new ApiError("Title is required", 400));
    }

    if (!payload.description) {
      next(new ApiError("Description is required", 400));
    }

    if (typeof payload.completed !== "boolean") {
      next(new ApiError("Completed must be a boolean value", 400));
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
  validateTask,
};
