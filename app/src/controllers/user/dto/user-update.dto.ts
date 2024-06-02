import { IsOptional } from "class-validator";
import UserDto from "./user.dto";

export interface UserUpdateDtoProps {
	password: string;
	full_name: string;
	activate: number;
}

export default class UserUpdateDto extends UserDto {
	@IsOptional()
	password: string;

	constructor(userUpdateProps: UserUpdateDtoProps) {
		super();
		this.password = userUpdateProps.password;
		this.full_name = userUpdateProps.full_name;
		this.activate = userUpdateProps.activate;
	}
}
