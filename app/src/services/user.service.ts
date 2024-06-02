import UserCreateDto from "../controllers/user/dto/user-create.dto";
import UserUpdateDto from "../controllers/user/dto/user-update.dto";
import { PaginationInterface } from "../common/helpers/interfaces/pagination.interface";
import UserAllDto from "../controllers/user/dto/user-all.dto";

export interface UserService {
	create(userCreateDto: UserCreateDto): Promise<object>;
	update(id: number, userUpdateDto: UserUpdateDto): Promise<object>;
	getById(id: number): Promise<object>;
	all(userAllDto: UserAllDto): Promise<PaginationInterface>;
	delete(id: number): Promise<object>;
}
