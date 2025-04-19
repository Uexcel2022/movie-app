import express from "express";
import { getAllUsers } from "../controller/userController.js";
import { authRouter } from "./authRouter.js";
const userRouter = express.Router();

userRouter.use("/auth", authRouter);

userRouter.route("/").get(getAllUsers);

export { userRouter };
