import { PoolOptions } from "mysql2/promise";
import MysqlDatabase, { MysqlDatabaseConfig } from "./mysql.database";

export default class MysqlConnection {
	static getConfig(config: MysqlDatabaseConfig): PoolOptions {
		return {
			host: config.host,
			port: config.port,
			user: config.user,
			password: config.password,
			database: config.database,
		} as PoolOptions;
	}

	static getClient(config: MysqlDatabaseConfig): MysqlDatabase {
		return new MysqlDatabase(MysqlConnection.getConfig(config));
	}
}
