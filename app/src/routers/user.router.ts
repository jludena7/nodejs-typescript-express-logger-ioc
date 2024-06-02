import { Container } from "inversify";
import { Router } from "express";
import APP_TYPES from "../common/types/app.types";
import userContainerModule from "../container/user.container";
import UserController from "../controllers/user/user.controller";

const container: Container = new Container();
container.load(userContainerModule);

const userController: UserController = container.get<UserController>(
	APP_TYPES.UserController
);

const router = Router();

router.post("/user", userController.create.bind(userController));
router.patch("/user/:id", userController.update.bind(userController));
router.get("/user/:id", userController.get.bind(userController));
router.get("/user", userController.all.bind(userController));
router.delete("/user/:id", userController.delete.bind(userController));

export default router;
