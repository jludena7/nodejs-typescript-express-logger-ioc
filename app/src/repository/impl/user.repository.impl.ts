import { inject, injectable } from "inversify";
import { UserRepository } from "../user.repository";
import APP_TYPES from "../../common/types/app.types";
import logger from "../../common/logger";
import userQuery from "./queries/user.query";
import { PAGINATION_LIMIT, STATUS } from "../../common/constants/app.constants";
import { UserInterface } from "../../interfaces/user.interface";
import UserCreateDto from "../../controllers/user/dto/user-create.dto";
import UserUpdateDto from "../../controllers/user/dto/user-update.dto";
import DbPagination from "../../common/database/mysql/paginator/db.pagination";
import UserAllDto from "../../controllers/user/dto/user-all.dto";
import MysqlDatabase from "../../common/database/mysql/mysql.database";

@injectable()
export default class UserRepositoryImpl implements UserRepository {
	protected table = "users";

	constructor(
		@inject(APP_TYPES.MysqlDatabase)
		private readonly mysqlDatabase: MysqlDatabase
	) {}

	async create(userCreateDto: UserCreateDto): Promise<number> {
		logger.debug("UserRepositoryImpl | create");

		const params: object = {
			email: userCreateDto.email,
			password: userCreateDto.password,
			full_name: userCreateDto.full_name,
			activate: userCreateDto.activate,
		};

		const id: number = await this.mysqlDatabase.queryInsert(this.table, params);
		logger.debug("UserRepositoryImpl | create | Response: ", id);

		return id;
	}

	async update(id: number, userUpdateDto: UserUpdateDto): Promise<number> {
		logger.debug("UserRepositoryImpl | update");

		const params: object = {
			full_name: userUpdateDto.full_name,
			activate: userUpdateDto.activate,
		};
		if (userUpdateDto.password) {
			Object.assign(params, {
				password: userUpdateDto.password,
			});
		}

		const userId: number = await this.mysqlDatabase.queryUpdate(
			id,
			this.table,
			params
		);
		logger.debug("UserRepositoryImpl | update | Response: ", userId);

		return userId;
	}

	async getAll(userAllDto: UserAllDto): Promise<DbPagination<UserInterface>> {
		logger.debug("UserRepositoryImpl | getAll");

		let params: unknown[] = [];
		let query: string = userQuery.getAllPaging.queryBase;
		if (userAllDto.after) {
			query += userQuery.getAllPaging.addAfter;
			params = [userAllDto.after];
		}
		if (userAllDto.before) {
			query += userQuery.getAllPaging.addBefore;
			params = [...params, userAllDto.before];
		}
		const limit: number = Number(userAllDto.limit) || PAGINATION_LIMIT;

		const response = await this.mysqlDatabase.pagination<UserInterface>(
			limit,
			query,
			params
		);
		logger.debug("UserRepositoryImpl | getAll | Response: ", response);

		return response;
	}

	async getById(id: number): Promise<UserInterface> {
		logger.debug("UserRepositoryImpl | getById | Request: ", { id });

		const response: UserInterface =
			await this.mysqlDatabase.findById<UserInterface>(this.table, id);
		logger.debug("UserRepositoryImpl | getById | Response: ", response);

		return response;
	}

	async desActive(id: number): Promise<number> {
		logger.debug("UserRepositoryImpl | delete | Request: ", { id });

		const params: object = {
			activate: STATUS.DE_ACTIVE,
		};
		const userId: number = await this.mysqlDatabase.queryUpdate(
			id,
			this.table,
			params
		);
		logger.debug("UserRepositoryImpl | delete | Response: ", userId);

		return userId;
	}

	async existUserByEmail(email: string): Promise<boolean> {
		logger.debug("UserRepositoryImpl | existUserByEmail | Request: ", {
			email,
		});

		const query: string = userQuery.existsUserByEmail;
		const user: UserInterface =
			await this.mysqlDatabase.querySelectOne<UserInterface>(query, [email]);

		logger.debug("UserRepositoryImpl | existUserByEmail | Response: ", user);
		return !!user;
	}
}
