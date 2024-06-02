import { Router } from "express";
import { Container } from "inversify";
import productContainerModule from "../container/product.container";
import ProductController from "../controllers/product/product.controller";
import APP_TYPES from "../common/types/app.types";

const container: Container = new Container();
container.load(productContainerModule);

const productController: ProductController = container.get<ProductController>(
	APP_TYPES.ProductController
);

const router = Router();

router.post("/product", productController.create.bind(productController));

export default router;
