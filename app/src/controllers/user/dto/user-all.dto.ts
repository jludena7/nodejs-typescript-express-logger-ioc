import { IsNumberString, IsOptional } from "class-validator";
import { ERROR_400 } from "../../../common/messages/common.errors";

export interface UserAllDtoProps {
	limit: number;
	before: number;
	after: number;
}

export default class UserAllDto {
	@IsNumberString(
		{},
		{
			message: JSON.stringify(ERROR_400.IS_NUMBER_STRING("limit")),
		}
	)
	@IsOptional()
	limit?: number;

	@IsNumberString(
		{},
		{
			message: JSON.stringify(ERROR_400.IS_NUMBER_STRING("before")),
		}
	)
	@IsOptional()
	before?: number;

	@IsNumberString(
		{},
		{
			message: JSON.stringify(ERROR_400.IS_NUMBER_STRING("after")),
		}
	)
	@IsOptional()
	after?: number;

	constructor(userAllProps: UserAllDtoProps) {
		this.limit = userAllProps?.limit;
		this.before = userAllProps?.before;
		this.after = userAllProps?.after;
	}
}
