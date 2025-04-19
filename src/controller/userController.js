import { User } from "../models/user.js";
import { AppError } from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  if (!users || users.length == 0) {
    return next(new AppError("No user found", 404));
  }
  res.status(200).json({
    results: users.length,
    status: "success",
    data: {
      users,
    },
  });
});
