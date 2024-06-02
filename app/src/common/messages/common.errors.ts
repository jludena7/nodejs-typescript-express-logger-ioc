import { HTTP } from "../constants/app.constants";
import BodyExceptionInterface from "../exceptions/interfaces/body-exception.interface";

export const ERROR_500 = {
	UNKNOWN: {
		statusCode: HTTP.STATUS_500,
		error: "UNKNOWN",
		message: "Unknown error",
	} as BodyExceptionInterface,
};

export const ERROR_403 = {
	ALREADY_EXISTS: {
		statusCode: HTTP.STATUS_403,
		error: "ALREADY_EXISTS",
		message: "Entity already exists",
	} as BodyExceptionInterface,
};

export const ERROR_404 = {
	ROUTER_NOT_FOUND: {
		statusCode: HTTP.STATUS_404,
		error: "ROUTER_NOT_FOUND",
		message: "Resource not found",
	} as BodyExceptionInterface,
};

export const ERROR_400 = {
	IS_NOT_EMPTY: (field: string) =>
		({
			statusCode: HTTP.STATUS_400,
			error: "IS_NOT_EMPTY",
			message: `The field '${field}' is empty`,
		}) as BodyExceptionInterface,
	IS_EMAIL: (field: string) =>
		({
			statusCode: HTTP.STATUS_400,
			error: "IS_EMAIL",
			message: `The field '${field}' must email format`,
		}) as BodyExceptionInterface,
	IS_NUMBER_STRING: (field: string) =>
		({
			statusCode: HTTP.STATUS_400,
			error: "IS_NUMBER_STRING",
			message: `The field '${field}' must contain numeric characters`,
		}) as BodyExceptionInterface,
	IS_NUMBER: (field: string) =>
		({
			statusCode: HTTP.STATUS_400,
			error: "IS_NUMBER",
			message: `The field '${field}' must numeric`,
		}) as BodyExceptionInterface,
};
