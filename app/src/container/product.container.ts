import { ContainerModule, interfaces } from "inversify";
import APP_TYPES from "../common/types/app.types";
import { ProductService } from "../services/product.service";
import ProductServiceImpl from "../services/impl/product.service.impl";
import ProductController from "../controllers/product/product.controller";
import ENV from "../common/env";
import { ProductRepository } from "../repository/product.repository";
import ProductRepositoryImpl from "../repository/impl/product.repository.impl";
import MysqlConnection from "../common/database/mysql/mysql.connection";
import MysqlDatabase from "../common/database/mysql/mysql.database";

const productContainerModule: ContainerModule = new ContainerModule(
	(bind: interfaces.Bind): void => {
		const mysqlConnection: MysqlDatabase = MysqlConnection.getClient({
			host: ENV.MYSQL_HOST,
			port: ENV.MYSQL_PORT,
			user: ENV.MYSQL_USER,
			password: ENV.MYSQL_PASSWORD,
			database: ENV.MYSQL_DATABASE,
		});

		bind<MysqlDatabase>(APP_TYPES.MysqlDatabase).toConstantValue(
			mysqlConnection
		);
		bind<ProductController>(APP_TYPES.ProductController).to(ProductController);
		bind<ProductService>(APP_TYPES.ProductService).to(ProductServiceImpl);
		bind<ProductRepository>(APP_TYPES.ProductRepository).to(
			ProductRepositoryImpl
		);
	}
);

export default productContainerModule;
