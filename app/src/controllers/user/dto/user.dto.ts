import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { ERROR_400 } from "../../../common/messages/common.errors";

export default class UserDto {
	@IsNotEmpty({
		message: JSON.stringify(ERROR_400.IS_NOT_EMPTY("password")),
	})
	password: string;

	@IsNotEmpty({
		message: JSON.stringify(ERROR_400.IS_NOT_EMPTY("full_name")),
	})
	full_name: string;

	@IsOptional()
	@IsNumber(
		{},
		{
			message: JSON.stringify(ERROR_400.IS_NUMBER("activate")),
		}
	)
	activate: number;
}
