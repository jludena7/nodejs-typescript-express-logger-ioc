import BodyExceptionInterface from "./interfaces/body-exception.interface";

export default class AppException extends Error {
	public errorBody: BodyExceptionInterface;

	constructor(errorBody: BodyExceptionInterface) {
		super();
		this.errorBody = errorBody;
	}
}
