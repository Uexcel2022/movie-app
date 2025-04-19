import express from "express";
import { userRouter } from "./routes/userRouter.js";
import { globalErrorController } from "./controller/globalErrorControll.js";
import { AppError } from "./utils/appError.js";

const app = express();

app.use(express.json());

app.use("/api/v1/users", userRouter);

app.all(/(.*)/, (req, resp, next) => {
  return next(
    new AppError(`Can't find API path: ${req.originalUrl} on this server!`, 404)
  );
});

app.use(globalErrorController);

export { app };
