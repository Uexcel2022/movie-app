import { User } from "../models/user.js";
import { AppError } from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";

export const register = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = { ...req.body };

  if (!email || !password) {
    return next(new AppError("Please enter email and password to login."));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.validatePassword(password, user.password))) {
    return next(new AppError("Incorrect email or password"));
  }

  const token = await promisify(jwt.sign)(
    { id: user._id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE_IN,
    }
  );

  res.status(200).json({
    token,
  });
});

export const getMe = catchAsync(async (req, res, next) => {
  const users = await User.findById(req.params.id);
  if (!users) {
    return next(new AppError("User not found with that ID", 404));
  }
  res.status(200).json({
    results: users.length,
    status: "success",
    data: {
      users,
    },
  });
});
