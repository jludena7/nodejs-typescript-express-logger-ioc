import { UserInterface } from "../interfaces/user.interface";
import UserCreateDto from "../controllers/user/dto/user-create.dto";
import UserUpdateDto from "../controllers/user/dto/user-update.dto";
import DbPagination from "../common/database/mysql/paginator/db.pagination";
import UserAllDto from "../controllers/user/dto/user-all.dto";

export interface UserRepository {
	create(userCreateDto: UserCreateDto): Promise<number>;
	update(id: number, userUpdateDto: UserUpdateDto): Promise<number>;
	getAll(userAllDto: UserAllDto): Promise<DbPagination<UserInterface>>;
	getById(id: number): Promise<UserInterface>;
	desActive(id: number): Promise<number>;
	existUserByEmail(email: string): Promise<boolean>;
}
