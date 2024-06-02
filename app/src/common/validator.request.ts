import { validate } from "class-validator";
import { ValidationError } from "class-validator/types/validation/ValidationError";
import BodyExceptionInterface from "./exceptions/interfaces/body-exception.interface";
import { NUMBER } from "./constants/app.constants";
import AppException from "./exceptions/app.exception";

export interface ValidatorRequestInterface {
	hasError: boolean;
	bodyError: BodyExceptionInterface;
}

export default class ValidatorRequest {
	static async run(params: object, options: object = {}): Promise<void> {
		const error = await ValidatorRequest.validate(params, options);
		if (error.hasError) {
			throw new AppException(error.bodyError);
		}
	}

	static async validate(
		params: object,
		options: object = {}
	): Promise<ValidatorRequestInterface> {
		const validErrors = await validate(params, options);
		if (validErrors.length > 0) {
			const errors = ValidatorRequest.parseErrors(validErrors);
			return {
				hasError: true,
				bodyError: errors[NUMBER.ZERO],
			};
		}

		return {
			hasError: false,
			bodyError: null,
		};
	}

	private static parseErrors(
		validErrors: ValidationError[]
	): BodyExceptionInterface[] {
		return validErrors.map((error: ValidationError): BodyExceptionInterface => {
			if (error.constraints) {
				return JSON.parse(Object.values(error.constraints)[NUMBER.ZERO]);
			}
			const childrenError = error.children.map(
				(childError: ValidationError): BodyExceptionInterface =>
					JSON.parse(Object.values(childError.constraints)[NUMBER.ZERO])
			);
			return childrenError[NUMBER.ZERO];
		});
	}
}
