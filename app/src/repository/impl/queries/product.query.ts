const productQuery = {
	existsProductByCode: "SELECT id FROM products WHERE code = ?",
};

export default productQuery;
