interface MysqlExceptionInterface {
	error: string;
	message: string;
}

export default class MysqlException extends Error {
	public responseException: MysqlExceptionInterface;

	constructor(responseException: MysqlExceptionInterface) {
		super();
		this.responseException = responseException;
	}
}
