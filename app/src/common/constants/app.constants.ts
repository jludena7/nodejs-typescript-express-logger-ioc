export const CORS = {
	ALLOW: "*",
	METHODS: ["GET", "POST", "PUT", "DELETE"],
	ALLOWED_HEADERS: "Content-Type,Authorization",
};

export const enum HTTP {
	STATUS_200 = 200,
	STATUS_201 = 201,
	STATUS_400 = 400,
	STATUS_403 = 403,
	STATUS_404 = 404,
	STATUS_500 = 500,
}

export const enum NUMBER {
	ZERO = 0,
	ONE = 1,
	TWO = 2,
	TEN = 10,
}

export const enum API {
	VERSION_V1 = "v1",
}

export const enum LOG_OUTPUT {
	FILE = "file",
	CONSOLE = "console",
}

export const enum STATUS {
	ACTIVE = 1,
	DE_ACTIVE = 0,
}

export const PAGINATION_LIMIT = 10;
