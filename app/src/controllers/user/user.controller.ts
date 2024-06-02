import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import APP_TYPES from "../../common/types/app.types";
import { UserService } from "../../services/user.service";
import appLogger from "../../common/logger";
import UserGetDto, { UserGetDtoProps } from "./dto/user-get.dto";
import { HTTP } from "../../common/constants/app.constants";
import UserCreateDto, { UserCreateDtoProps } from "./dto/user-create.dto";
import UserUpdateDto, { UserUpdateDtoProps } from "./dto/user-update.dto";
import AppException from "../../common/exceptions/app.exception";
import { ERROR_500 } from "../../common/messages/common.errors";
import UserAllDto, { UserAllDtoProps } from "./dto/user-all.dto";
import ValidatorRequest from "../../common/validator.request";

@injectable()
export default class UserController {
	constructor(
		@inject(APP_TYPES.UserService)
		private readonly userService: UserService
	) {}

	async create(req: Request, res: Response): Promise<void> {
		appLogger.debug("UserController | create | request: ", req.body);

		try {
			const userCreateDto = new UserCreateDto(req.body as UserCreateDtoProps);
			await ValidatorRequest.run(userCreateDto);

			const response = await this.userService.create(userCreateDto);
			res.status(HTTP.STATUS_201);
			res.json(response);
		} catch (error) {
			appLogger.debug("UserController | create | error: ", error);
			if (error instanceof AppException) {
				res.status(error.errorBody.statusCode);
				res.json(error.errorBody);
			} else {
				res.status(ERROR_500.UNKNOWN.statusCode);
				res.json(ERROR_500.UNKNOWN);
			}
		}
	}

	async update(req: Request, res: Response): Promise<void> {
		appLogger.debug(
			"UserController | update | request: ",
			req.params,
			req.body
		);

		try {
			const userGetDto = new UserGetDto(req.params as any as UserGetDtoProps);
			await ValidatorRequest.run(userGetDto);

			const userUpdateDto = new UserUpdateDto(req.body as UserUpdateDtoProps);
			await ValidatorRequest.run(userUpdateDto);

			const response = await this.userService.update(
				userGetDto.id,
				userUpdateDto
			);
			res.status(HTTP.STATUS_200);
			res.json(response);
		} catch (error) {
			appLogger.debug("UserController | update | error: ", error);
			if (error instanceof AppException) {
				res.status(error.errorBody.statusCode);
				res.json(error.errorBody);
			} else {
				res.status(ERROR_500.UNKNOWN.statusCode);
				res.json(ERROR_500.UNKNOWN);
			}
		}
	}

	async get(req: Request, res: Response): Promise<void> {
		appLogger.debug("UserController | get | request: ", req.params);

		try {
			const userGetDto = new UserGetDto(req.params as any as UserGetDtoProps);
			await ValidatorRequest.run(userGetDto);

			const response = await this.userService.getById(userGetDto.id);
			res.status(HTTP.STATUS_200);
			res.json(response);
		} catch (error) {
			appLogger.debug("UserController | get | error: ", error);
			if (error instanceof AppException) {
				res.status(error.errorBody.statusCode);
				res.json(error.errorBody);
			} else {
				res.status(ERROR_500.UNKNOWN.statusCode);
				res.json(ERROR_500.UNKNOWN);
			}
		}
	}

	async all(req: Request, res: Response): Promise<void> {
		appLogger.debug("UserController | all | request: ", req.query);

		try {
			const userAllDto = new UserAllDto(req.query as any as UserAllDtoProps);
			await ValidatorRequest.run(userAllDto);

			const response = await this.userService.all(userAllDto);
			res.status(HTTP.STATUS_200);
			res.json(response);
		} catch (error) {
			appLogger.debug("UserController | all | error: ", error);
			if (error instanceof AppException) {
				res.status(error.errorBody.statusCode);
				res.json(error.errorBody);
			} else {
				res.status(ERROR_500.UNKNOWN.statusCode);
				res.json(ERROR_500.UNKNOWN);
			}
		}
	}

	async delete(req: Request, res: Response): Promise<void> {
		appLogger.debug("UserController | delete | request: ", req.params);

		try {
			const userGetDto = new UserGetDto(req.params as any as UserGetDtoProps);
			await ValidatorRequest.run(userGetDto);

			const response = await this.userService.delete(userGetDto.id);
			res.status(HTTP.STATUS_200);
			res.json(response);
		} catch (error) {
			appLogger.debug("UserController | delete | error: ", error);
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
