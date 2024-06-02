const userQuery = {
	existsUserByEmail: " SELECT id FROM users WHERE email = ? ",
	getAllPaging: {
		queryBase: " SELECT * FROM users WHERE 1 = 1 ",
		addBefore: "AND id <= ?",
		addAfter: " AND id >= ?",
	},
};

export default userQuery;
