import ProductCreateDto from "../controllers/product/dto/product-create.dto";

export interface ProductService {
	create(productCreateDto: ProductCreateDto): Promise<object>;
}
