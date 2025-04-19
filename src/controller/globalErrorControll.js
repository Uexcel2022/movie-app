import { AppError } from "../utils/appError.js";

export const globalErrorController = async (err, req, res, next) => {
  const timestamps = new Date(
    Date.now() + new Date().getTimezoneOffset() * -1 * 60 * 1000
  );
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  err.message = err.message || "Something went wrong!";
  err.stack = err.stack || "No stack available";

  if (err.name === "ValidationError") {
    err = new AppError(
      Object.values(err.errors)
        .map((e) => e.message)
        .join(" , "),
      400
    );
  }

  if (err.name === "CastError") {
    err = new AppError(`Invalid ID: ${err.value}`, 400);
  }

  if (err.name === "MongooseError") {
    err = new AppError(err.message, 400);
  }

  if (process.env.NODE_ENV === "development") {
    if (err.isOperational) {
      res.status(err.statusCode).json({
        timestamps,
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack,
      });
    } else {
      res.status(err.statusCode).json({
        timestamps,
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack,
      });
    }
  } else {
    if (process.env.NODE_ENV === "development") {
      if (err.isOperational) {
        res.status(err.statusCode).json({
          timestamps,
          status: err.status,
          message: err.message,
        });
      } else {
        res.status(err.statusCode).json({
          timestamps,
          status: err.status,
          message: "Something went wrong!",
        });
      }
    }
  }
};
