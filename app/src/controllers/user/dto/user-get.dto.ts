import { IsNotEmpty, IsNumberString } from "class-validator";
import { ERROR_400 } from "../../../common/messages/common.errors";

export interface UserGetDtoProps {
	id: number;
}

export default class UserGetDto {
	@IsNotEmpty({
		message: JSON.stringify(ERROR_400.IS_NOT_EMPTY("id")),
	})
	@IsNumberString(
		{ no_symbols: true },
		{
			message: JSON.stringify(ERROR_400.IS_NUMBER_STRING("id")),
		}
	)
	id: number;

	constructor(userGetProps: UserGetDtoProps) {
		this.id = userGetProps.id;
	}
}
