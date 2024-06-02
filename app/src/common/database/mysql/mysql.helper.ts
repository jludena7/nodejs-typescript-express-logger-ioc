import { NUMBER } from "../../constants/app.constants";
import MysqlException from "./mysql.exception";
import MYSQL_ERRORS from "./mysql.errors";

export interface BuildSqlInterface {
	query: string;
	params: unknown[];
}

export default class MysqlHelper {
	static builtSqlInsert(table: string, entity: object): BuildSqlInterface {
		const stringColumns: string = Object.keys(entity).join("`, `");
		const placeholders: string = Object.keys(entity)
			.map((): string => "?")
			.join(", ");

		const query: string = `INSERT INTO \`${table}\`  (\`${stringColumns}\`)  VALUES (${placeholders})`;

		return { query, params: Object.values(entity) } as BuildSqlInterface;
	}

	static builtSqlUpdate(
		id: number,
		table: string,
		entity: object
	): BuildSqlInterface {
		const setClause = Object.keys(entity)
			.map((key: string): string => `\`${key}\` = ?`)
			.join(", ");
		const values = Object.values(entity);

		const query: string = `UPDATE ${table} SET ${setClause} WHERE id = ?`;
		const params: unknown[] = [...values, id];

		return { query, params } as BuildSqlInterface;
	}

	static validParamsInsert(table: string, entity: object): void {
		if (
			String(table).trim().length === NUMBER.ZERO ||
			Object.keys(entity).length < NUMBER.ONE
		) {
			throw new MysqlException(MYSQL_ERRORS.MYSQL_INSERT_EMPTY_PARAMS);
		}
	}

	static validParamsUpdate(id: number, table: string, entity: object): void {
		if (
			!id ||
			String(table).trim().length === NUMBER.ZERO ||
			Object.keys(entity).length < NUMBER.ONE
		) {
			throw new MysqlException(MYSQL_ERRORS.MYSQL_UPDATE_EMPTY_PARAMS);
		}
	}

	static validParamsSelect(query: string): void {
		if (String(query).trim().length === NUMBER.ZERO) {
			throw new MysqlException(MYSQL_ERRORS.MYSQL_EMPTY_QUERY);
		}
	}

	static validLimitParam(limit: number): void {
		if (!Number.isInteger(limit) || limit <= 0) {
			throw new MysqlException(MYSQL_ERRORS.MYSQL_INVALID_LIMIT);
		}
	}
}
