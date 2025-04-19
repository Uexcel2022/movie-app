import express from "express";
import { register, getMe, login } from "../controller/authController.js";

const authRouter = express.Router();

authRouter.post("/signup", register);
authRouter.post("/login", login);

authRouter.route("/:id").get(getMe);

export { authRouter };
