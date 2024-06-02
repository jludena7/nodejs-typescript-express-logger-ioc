import mysql, {
	FieldPacket,
	Pool,
	PoolOptions,
	ResultSetHeader,
	RowDataPacket,
} from "mysql2/promise";
import { NUMBER } from "../../constants/app.constants";
import DbPagination, { DbPaginationCursor } from "./paginator/db.pagination";
import MysqlHelper from "./mysql.helper";
import MysqlException from "./mysql.exception";

export interface MysqlDatabaseConfig {
	host: string;
	port: number;
	user: string;
	password: string;
	database: string;
}

export default class MysqlDatabase {
	private readonly config: PoolOptions;

	constructor(config: PoolOptions) {
		this.config = config;
	}

	static async getTotalRowCount(
		pool: Pool,
		queryBase: string,
		params?: any[]
	): Promise<number> {
		const query = `SELECT COUNT(*) AS total_count FROM (${queryBase}) AS subquery`;
		const result: [RowDataPacket[], FieldPacket[]] = await pool.query(
			query,
			params
		);
		const rowsTotal = result[NUMBER.ZERO][NUMBER.ZERO] as {
			total_count: string;
		};
		return parseInt(rowsTotal.total_count, NUMBER.TEN);
	}

	private async preparePagination<T>(
		limit: number,
		query: string,
		params?: any[],
		returnRemainingItems?: boolean
	): Promise<DbPagination<T>> {
		MysqlHelper.validParamsSelect(query);
		MysqlHelper.validLimitParam(limit);

		let pool: Pool;
		try {
			pool = mysql.createPool(this.config);

			const paginationQuery = `${query} LIMIT ${limit}`;
			const result: [RowDataPacket[], FieldPacket[]] = await pool.query(
				paginationQuery,
				params
			);
			const rows = result[NUMBER.ZERO] as T[];

			let remainingItems = null;
			const paginationCursor = {
				before: rows[NUMBER.ZERO] ?? null,
				after: rows[rows.length - NUMBER.ONE] ?? null,
			};

			if (returnRemainingItems !== false) {
				const totalRecords: number = await MysqlDatabase.getTotalRowCount(
					pool,
					query,
					params
				);
				remainingItems = totalRecords - rows.length;
			}
			return new DbPagination<T>(
				rows,
				paginationCursor as DbPaginationCursor<T>,
				remainingItems
			);
		} catch (error) {
			throw new MysqlException({
				message: error.message,
				error,
			});
		} finally {
			await pool.end();
		}
	}

	async queryUpdate(
		id: number,
		table: string,
		entity: object
	): Promise<number> {
		MysqlHelper.validParamsUpdate(id, table, entity);

		let pool: Pool;
		const { query, params } = MysqlHelper.builtSqlUpdate(id, table, entity);
		try {
			pool = mysql.createPool(this.config);
			await pool.query(query, params || []);
			return id;
		} catch (error) {
			throw new MysqlException({
				message: error.message,
				error,
			});
		} finally {
			await pool.end();
		}
	}

	async queryInsert(table: string, entity: object): Promise<number> {
		MysqlHelper.validParamsInsert(table, entity);

		let pool: Pool;
		const { query, params } = MysqlHelper.builtSqlInsert(table, entity);
		try {
			pool = mysql.createPool(this.config);
			const result: [ResultSetHeader, FieldPacket[]] = await pool.query(
				query,
				params || []
			);
			return result[NUMBER.ZERO].insertId;
		} catch (error) {
			throw new MysqlException({
				message: error.message,
				error,
			});
		} finally {
			await pool.end();
		}
	}

	async findById<T>(table: string, id: number): Promise<T> {
		const query: string = `SELECT * FROM \`${table}\` WHERE id = ?`;
		return this.querySelectOne<T>(query, [id]);
	}

	async querySelectOne<T>(query: string, params?: any[]): Promise<T> {
		const response: T[] = await this.querySelectAll<T>(query, params);
		if (response.length > NUMBER.ZERO) {
			return response[NUMBER.ZERO] as T;
		}

		return null;
	}

	async querySelectAll<T>(query: string, params?: any[]): Promise<T[]> {
		MysqlHelper.validParamsSelect(query);

		let pool: Pool;
		try {
			pool = mysql.createPool(this.config);
			const result: [RowDataPacket[], FieldPacket[]] = await pool.query(
				query,
				params || []
			);
			return result[NUMBER.ZERO] as T[];
		} catch (error) {
			throw new MysqlException({
				message: error.message,
				error,
			});
		} finally {
			await pool.end();
		}
	}

	async pagination<T>(
		limit: number,
		query: string,
		params?: any[],
		returnRemainingItems?: boolean
	): Promise<DbPagination<T>> {
		return this.preparePagination<T>(
			limit,
			query,
			params,
			returnRemainingItems
		);
	}
}
