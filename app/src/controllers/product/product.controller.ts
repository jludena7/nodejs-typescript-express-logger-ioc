import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { ProductService } from "../../services/product.service";
import APP_TYPES from "../../common/types/app.types";
import appLogger from "../../common/logger";
import { HTTP } from "../../common/constants/app.constants";
import ProductCreateDto, {
	ProductCreateDtoProps,
} from "./dto/product-create.dto";
import ValidatorRequest from "../../common/validator.request";
import AppException from "../../common/exceptions/app.exception";
import { ERROR_500 } from "../../common/messages/common.errors";

@injectable()
export default class ProductController {
	constructor(
		@inject(APP_TYPES.ProductService)
		private readonly productService: ProductService
	) {}

	async create(req: Request, res: Response): Promise<void> {
		appLogger.debug("ProductController | create | request: ", req.body);

		try {
			const productCreateDto = new ProductCreateDto(
				req.body as ProductCreateDtoProps
			);
			await ValidatorRequest.run(productCreateDto);

			const response = await this.productService.create(productCreateDto);
			res.status(HTTP.STATUS_201);
			res.json(response);
		} catch (error) {
			appLogger.debug("ProductController | create | error: ", error);
			if (error instanceof AppException) {
				res.status(error.errorBody.statusCode);
				res.json(error.errorBody);
			} else {
				res.status(ERROR_500.UNKNOWN.statusCode);
				res.json(ERROR_500.UNKNOWN);
			}
		}
	}
}
