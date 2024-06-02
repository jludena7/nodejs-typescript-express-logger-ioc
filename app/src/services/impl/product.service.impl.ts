import { inject, injectable } from "inversify";
import { ProductService } from "../product.service";
import ProductCreateDto from "../../controllers/product/dto/product-create.dto";
import APP_TYPES from "../../common/types/app.types";
import { ProductRepository } from "../../repository/product.repository";
import AppException from "../../common/exceptions/app.exception";
import { ERROR_403 } from "../../common/messages/common.errors";

@injectable()
export default class ProductServiceImpl implements ProductService {
	constructor(
		@inject(APP_TYPES.ProductRepository)
		private readonly productRepository: ProductRepository
	) {}

	async create(productCreateDto: ProductCreateDto): Promise<object> {
		const existsProduct: boolean =
			await this.productRepository.existProductByCode(productCreateDto.code);
		if (existsProduct) {
			throw new AppException(ERROR_403.ALREADY_EXISTS);
		}

		const id: number = await this.productRepository.create(productCreateDto);
		return { id };
	}
}
