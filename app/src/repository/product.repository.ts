import ProductCreateDto from "../controllers/product/dto/product-create.dto";

export interface ProductRepository {
	create(productCreateDto: ProductCreateDto): Promise<number>;
	existProductByCode(code: string): Promise<boolean>;
}
