import { ContainerModule, interfaces } from "inversify";
import APP_TYPES from "../common/types/app.types";
import { UserService } from "../services/user.service";
import UserServiceImpl from "../services/impl/user.service.impl";
import UserController from "../controllers/user/user.controller";
import ENV from "../common/env";
import UserRepositoryImpl from "../repository/impl/user.repository.impl";
import { UserRepository } from "../repository/user.repository";
import MysqlDatabase from "../common/database/mysql/mysql.database";
import MysqlConnection from "../common/database/mysql/mysql.connection";

const userContainerModule: ContainerModule = new ContainerModule(
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
		bind<UserRepository>(APP_TYPES.UserRepository).to(UserRepositoryImpl);
		bind<UserController>(APP_TYPES.UserController).to(UserController);
		bind<UserService>(APP_TYPES.UserService).to(UserServiceImpl);
	}
);

export default userContainerModule;
