import { IsNotEmpty, IsNumber } from "class-validator";
import { ERROR_400 } from "../../../common/messages/common.errors";

export interface ProductCreateDtoProps {
	code: string;
	name: string;
	price: number;
}

export default class ProductCreateDto {
	@IsNotEmpty({
		message: JSON.stringify(ERROR_400.IS_NOT_EMPTY("code")),
	})
	code: string;

	@IsNotEmpty({
		message: JSON.stringify(ERROR_400.IS_NOT_EMPTY("name")),
	})
	name: string;

	@IsNotEmpty({
		message: JSON.stringify(ERROR_400.IS_NOT_EMPTY("price")),
	})
	@IsNumber(
		{},
		{
			message: JSON.stringify(ERROR_400.IS_NUMBER("price")),
		}
	)
	price: number;

	constructor(userCreateProps: ProductCreateDtoProps) {
		this.code = userCreateProps.code;
		this.name = userCreateProps.name;
		this.price = userCreateProps.price;
	}
}
