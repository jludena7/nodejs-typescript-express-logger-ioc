import { inject, injectable } from "inversify";
import APP_TYPES from "../../common/types/app.types";
import logger from "../../common/logger";
import { ProductRepository } from "../product.repository";
import ProductCreateDto from "../../controllers/product/dto/product-create.dto";
import { ProductInterface } from "../../interfaces/product.interface";
import productQuery from "./queries/product.query";
import MysqlDatabase from "../../common/database/mysql/mysql.database";

@injectable()
export default class ProductRepositoryImpl implements ProductRepository {
	protected table = "products";

	constructor(
		@inject(APP_TYPES.MysqlDatabase)
		private readonly mysqlDatabase: MysqlDatabase
	) {}

	async create(productCreateDto: ProductCreateDto): Promise<number> {
		logger.debug("ProductRepositoryImpl | create");

		const params: object = {
			code: productCreateDto.code,
			name: productCreateDto.name,
			price: productCreateDto.price,
		};
		const id: number = await this.mysqlDatabase.queryInsert(this.table, params);
		logger.debug("ProductRepositoryImpl | create | Response: ", id);

		return id;
	}

	async existProductByCode(code: string): Promise<boolean> {
		logger.debug("ProductRepositoryImpl | existProductByCode | Request: ", {
			code,
		});

		const query: string = productQuery.existsProductByCode;
		const product: ProductInterface =
			await this.mysqlDatabase.querySelectOne<ProductInterface>(query, [code]);

		logger.debug(
			"ProductRepositoryImpl | existProductByCode | Response: ",
			product
		);
		return !!product;
	}
}
