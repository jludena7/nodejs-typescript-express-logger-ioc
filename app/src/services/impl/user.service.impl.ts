import { inject, injectable } from "inversify";
import { UserService } from "../user.service";
import APP_TYPES from "../../common/types/app.types";
import { UserRepository } from "../../repository/user.repository";
import UserCreateDto from "../../controllers/user/dto/user-create.dto";
import UserUpdateDto from "../../controllers/user/dto/user-update.dto";
import { UserInterface } from "../../interfaces/user.interface";
import DbPagination from "../../common/database/mysql/paginator/db.pagination";
import { PaginationInterface } from "../../common/helpers/interfaces/pagination.interface";
import AppException from "../../common/exceptions/app.exception";
import { ERROR_403 } from "../../common/messages/common.errors";
import UserAllDto from "../../controllers/user/dto/user-all.dto";

@injectable()
export default class UserServiceImpl implements UserService {
	constructor(
		@inject(APP_TYPES.UserRepository)
		private readonly userRepository: UserRepository
	) {}

	async create(userCreateDto: UserCreateDto): Promise<object> {
		const existsUser: boolean = await this.userRepository.existUserByEmail(
			userCreateDto.email
		);
		if (existsUser) {
			throw new AppException(ERROR_403.ALREADY_EXISTS);
		}

		const id: number = await this.userRepository.create(userCreateDto);
		return { id };
	}

	async update(id: number, userUpdateDto: UserUpdateDto): Promise<object> {
		const userId: number = await this.userRepository.update(id, userUpdateDto);
		return { id: userId };
	}

	async getById(id: number): Promise<object> {
		return this.userRepository.getById(id);
	}

	async all(userAllDto: UserAllDto): Promise<PaginationInterface> {
		const response: DbPagination<UserInterface> =
			await this.userRepository.getAll(userAllDto);

		const before: number = response.cursors.before?.id;
		const after: number = response.cursors.after?.id;
		return {
			items: response.items,
			paging: {
				previous: before ? `/user?before=${before}` : null,
				next: after ? `/user?after=${after}` : null,
				cursors: {
					before,
					after,
				},
				remaining_items: response.remainingItems,
			},
		} as PaginationInterface;
	}

	async delete(id: number): Promise<object> {
		const userId: number = await this.userRepository.desActive(id);
		return { id: userId };
	}
}
