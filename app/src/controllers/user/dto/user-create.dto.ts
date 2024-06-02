import { IsEmail, IsNotEmpty } from "class-validator";
import { ERROR_400 } from "../../../common/messages/common.errors";
import UserDto from "./user.dto";

export interface UserCreateDtoProps {
	email: string;
	password: string;
	full_name: string;
	activate: number;
}

export default class UserCreateDto extends UserDto {
	@IsNotEmpty({
		message: JSON.stringify(ERROR_400.IS_NOT_EMPTY("email")),
	})
	@IsEmail(
		{},
		{
			message: JSON.stringify(ERROR_400.IS_EMAIL("email")),
		}
	)
	email: string;

	constructor(userCreateProps: UserCreateDtoProps) {
		super();
		this.email = userCreateProps.email;
		this.password = userCreateProps.password;
		this.full_name = userCreateProps.full_name;
		this.activate = userCreateProps.activate;
	}
}
