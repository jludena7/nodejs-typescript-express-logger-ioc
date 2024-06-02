import "reflect-metadata";
import { Request, Response } from "express";
import { UserService } from "../../../app/src/services/user.service";
import UserController from "../../../app/src/controllers/user/user.controller";
import UserCreateDto from "../../../app/src/controllers/user/dto/user-create.dto";
import UserUpdateDto from "../../../app/src/controllers/user/dto/user-update.dto";
import UserAllDto from "../../../app/src/controllers/user/dto/user-all.dto";
import { HTTP } from "../../../app/src/common/constants/app.constants";
import { ERROR_500 } from "../../../app/src/common/messages/common.errors";
import AppException from "../../../app/src/common/exceptions/app.exception";
import BodyExceptionInterface from "../../../app/src/common/exceptions/interfaces/body-exception.interface";

describe("UserController", () => {
	let userService: jest.Mocked<UserService>;
	let userController: UserController;
	let reqCreate: Request;
	let reqUpdate: Request;
	let reqGet: Request;
	let reqDelete: Request;
	let reqAll: Request;
	let res: Response;

	beforeEach(() => {
		userService = {
			create: jest.fn().mockResolvedValue({ id: 1 }),
			update: jest.fn().mockResolvedValue({ id: 1 }),
			getById: jest.fn().mockResolvedValue({}),
			all: jest.fn().mockResolvedValue([]),
			delete: jest.fn().mockResolvedValue({ id: 1 }),
		} as any;

		userController = new UserController(userService);

		reqCreate = {
			body: {
				email: "demo@hotmail.com",
				password: "password",
				full_name: "Pedro Perez",
				activate: 1,
			},
			params: {},
			query: {},
		} as any as Request;

		reqUpdate = {
			body: {
				email: "demo@hotmail.com",
				password: "password",
				full_name: "Pedro Perez",
				activate: 1,
			},
			params: { id: "1" },
			query: {},
		} as any as Request;

		reqGet = {
			body: {},
			params: { id: "1" },
			query: {},
		} as any as Request;

		reqDelete = {
			body: {},
			params: { id: "1" },
			query: {},
		} as any as Request;

		reqAll = {
			body: {},
			params: { id: "1" },
			query: { before: "1", after: "10", limit: "10" },
		} as any as Request;

		res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn().mockReturnThis(),
		} as any as Response;
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("Create", () => {
		it("should create a new user and return 201 status", async () => {
			await userController.create(reqCreate, res);

			expect(userService.create).toHaveBeenCalledWith(
				expect.any(UserCreateDto)
			);
			expect(res.status).toHaveBeenCalledWith(HTTP.STATUS_201);
			expect(res.json).toHaveBeenCalledWith({ id: 1 });
		});
		it("should handle unknown errors and return 500 status", async () => {
			userService.create.mockRejectedValueOnce(new Error("Unknown Error"));

			await userController.create(reqCreate, res);

			expect(res.status).toHaveBeenCalledWith(ERROR_500.UNKNOWN.statusCode);
			expect(res.json).toHaveBeenCalledWith(ERROR_500.UNKNOWN);
		});
		it("should handle AppException errors", async () => {
			const errorTemp = {
				statusCode: HTTP.STATUS_403,
				error: "EMULATE_ERROR",
				message: "Emulate error",
			} as BodyExceptionInterface;

			userService.create.mockRejectedValueOnce(new AppException(errorTemp));

			await userController.create(reqCreate, res);

			expect(res.status).toHaveBeenCalledWith(errorTemp.statusCode);
			expect(res.json).toHaveBeenCalledWith(errorTemp);
		});
	});

	describe("Update", () => {
		it("should update a user and return 200 status", async () => {
			await userController.update(reqUpdate, res);

			expect(userService.update).toHaveBeenCalledWith(
				"1",
				expect.any(UserUpdateDto)
			);
			expect(res.status).toHaveBeenCalledWith(HTTP.STATUS_200);
			expect(res.json).toHaveBeenCalled();
		});
		it("should handle unknown errors and return 500 status", async () => {
			userService.update.mockRejectedValueOnce(new Error("Unknown Error"));

			await userController.update(reqUpdate, res);

			expect(res.status).toHaveBeenCalledWith(ERROR_500.UNKNOWN.statusCode);
			expect(res.json).toHaveBeenCalledWith(ERROR_500.UNKNOWN);
		});
		it("should handle AppException errors", async () => {
			const errorTemp = {
				statusCode: HTTP.STATUS_403,
				error: "EMULATE_ERROR",
				message: "Emulate error",
			} as BodyExceptionInterface;

			userService.update.mockRejectedValueOnce(new AppException(errorTemp));

			await userController.update(reqUpdate, res);

			expect(res.status).toHaveBeenCalledWith(errorTemp.statusCode);
			expect(res.json).toHaveBeenCalledWith(errorTemp);
		});
	});

	describe("Get", () => {
		it("should get a user by id and return 200 status", async () => {
			await userController.get(reqGet, res);

			expect(userService.getById).toHaveBeenCalledWith("1");
			expect(res.status).toHaveBeenCalledWith(HTTP.STATUS_200);
			expect(res.json).toHaveBeenCalled();
		});
		it("should handle unknown errors and return 500 status", async () => {
			userService.getById.mockRejectedValueOnce(new Error("Unknown Error"));

			await userController.get(reqUpdate, res);

			expect(res.status).toHaveBeenCalledWith(ERROR_500.UNKNOWN.statusCode);
			expect(res.json).toHaveBeenCalledWith(ERROR_500.UNKNOWN);
		});
		it("should handle AppException errors", async () => {
			const errorTemp = {
				statusCode: HTTP.STATUS_403,
				error: "EMULATE_ERROR",
				message: "Emulate error",
			} as BodyExceptionInterface;

			userService.getById.mockRejectedValueOnce(new AppException(errorTemp));

			await userController.get(reqUpdate, res);

			expect(res.status).toHaveBeenCalledWith(errorTemp.statusCode);
			expect(res.json).toHaveBeenCalledWith(errorTemp);
		});
	});

	describe("All", () => {
		it("should get all users and return 200 status", async () => {
			await userController.all(reqAll, res);

			expect(userService.all).toHaveBeenCalledWith(expect.any(UserAllDto));
			expect(res.status).toHaveBeenCalledWith(HTTP.STATUS_200);
			expect(res.json).toHaveBeenCalled();
		});
		it("should handle unknown errors and return 500 status", async () => {
			userService.all.mockRejectedValueOnce(new Error("Unknown Error"));

			await userController.all(reqAll, res);

			expect(res.status).toHaveBeenCalledWith(ERROR_500.UNKNOWN.statusCode);
			expect(res.json).toHaveBeenCalledWith(ERROR_500.UNKNOWN);
		});
		it("should handle AppException errors", async () => {
			const errorTemp = {
				statusCode: HTTP.STATUS_403,
				error: "EMULATE_ERROR",
				message: "Emulate error",
			} as BodyExceptionInterface;

			userService.all.mockRejectedValueOnce(new AppException(errorTemp));

			await userController.all(reqAll, res);

			expect(res.status).toHaveBeenCalledWith(errorTemp.statusCode);
			expect(res.json).toHaveBeenCalledWith(errorTemp);
		});
	});

	describe("Delete", () => {
		it("should delete a user and return 200 status", async () => {
			await userController.delete(reqDelete, res);

			expect(userService.delete).toHaveBeenCalledWith("1");
			expect(res.status).toHaveBeenCalledWith(HTTP.STATUS_200);
			expect(res.json).toHaveBeenCalled();
		});
		it("should handle unknown errors and return 500 status", async () => {
			userService.delete.mockRejectedValueOnce(new Error("Unknown Error"));

			await userController.delete(reqDelete, res);

			expect(res.status).toHaveBeenCalledWith(ERROR_500.UNKNOWN.statusCode);
			expect(res.json).toHaveBeenCalledWith(ERROR_500.UNKNOWN);
		});
		it("should handle AppException errors", async () => {
			const errorTemp = {
				statusCode: HTTP.STATUS_403,
				error: "EMULATE_ERROR",
				message: "Emulate error",
			} as BodyExceptionInterface;

			userService.delete.mockRejectedValueOnce(new AppException(errorTemp));

			await userController.delete(reqDelete, res);

			expect(res.status).toHaveBeenCalledWith(errorTemp.statusCode);
			expect(res.json).toHaveBeenCalledWith(errorTemp);
		});
	});
});
