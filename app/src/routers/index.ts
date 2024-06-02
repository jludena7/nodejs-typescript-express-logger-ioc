import { Router } from "express";
import userRouter from "./user.router";
import productRouter from "./product.router";

const router = Router();

router.use("/", userRouter);
router.use("/", productRouter);

export default router;
