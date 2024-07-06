import "reflect-metadata";
import { Request, Response } from "express";
import { ProductService } from "../../../app/src/services/product.service";
import ProductController from "../../../app/src/controllers/product/product.controller";
import ProductCreateDto from "../../../app/src/controllers/product/dto/product-create.dto";
import { HTTP } from "../../../app/src/common/constants/app.constants";
import {
	ERROR_400,
	ERROR_500,
} from "../../../app/src/common/messages/common.errors";

describe("ProductController", () => {
	let productService: jest.Mocked<ProductService>;
	let productController: ProductController;
	let req: Request;
	let res: Response;

	beforeEach(() => {
		productService = {
			create: jest.fn().mockReturnValue({ id: 1 }),
		} as jest.Mocked<ProductService>;

		productController = new ProductController(productService);

		req = {
			body: { code: "10001", name: "Product Name", price: 100 },
		} as Request;

		res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn().mockReturnThis(),
		} as unknown as Response;
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should create a new product and return 201 status", async () => {
		await productController.create(req, res);

		expect(productService.create).toHaveBeenCalledWith(
			expect.any(ProductCreateDto)
		);
		expect(res.status).toHaveBeenCalledWith(HTTP.STATUS_201);
		expect(res.json).toHaveBeenCalledWith({ id: 1 });
	});

	it("should handle AppException IS_NOT_EMPTY code", async () => {
		const requestTemp = {
			body: { code: null, name: "Product Name", price: 100 },
		} as Request;

		await productController.create(requestTemp, res);

		expect(res.status).toHaveBeenCalledWith(HTTP.STATUS_400);
		expect(res.json).toHaveBeenCalledWith(ERROR_400.IS_NOT_EMPTY("code"));
	});

	it("should handle AppException IS_NOT_EMPTY price", async () => {
		const requestTemp = {
			body: { code: "10001", name: "Product Name", price: null },
		} as Request;

		await productController.create(requestTemp, res);

		expect(res.status).toHaveBeenCalledWith(HTTP.STATUS_400);
		expect(res.json).toHaveBeenCalledWith(ERROR_400.IS_NUMBER("price"));
	});

	it("should handle AppException IS_NOT_EMPTY name", async () => {
		const requestTemp = {
			body: { code: "10001", name: "", price: 100 },
		} as Request;

		await productController.create(requestTemp, res);

		expect(res.status).toHaveBeenCalledWith(HTTP.STATUS_400);
		expect(res.json).toHaveBeenCalledWith(ERROR_400.IS_NOT_EMPTY("name"));
	});

	it("should handle unknown errors and return 500 status", async () => {
		productService.create.mockRejectedValueOnce(new Error("Unknown Error"));

		await productController.create(req, res);

		expect(res.status).toHaveBeenCalledWith(ERROR_500.UNKNOWN.statusCode);
		expect(res.json).toHaveBeenCalledWith(ERROR_500.UNKNOWN);
	});
});
