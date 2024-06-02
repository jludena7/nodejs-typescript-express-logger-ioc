require("dotenv").config({ path: ".env" });

interface env {
	APP_PORT: number;
	LOG_LEVEL: string;
	LOG_ACTIVE: boolean;
	LOG_OUTPUT: string;
	MYSQL_HOST: string;
	MYSQL_PORT: number;
	MYSQL_USER: string;
	MYSQL_PASSWORD: string;
	MYSQL_DATABASE: string;
}

const ENV: env = {
	APP_PORT: Number(process.env.APP_PORT),
	LOG_LEVEL: process.env.LOG_LEVEL,
	LOG_ACTIVE: Boolean(Number(process.env.LOG_ACTIVE)),
	LOG_OUTPUT: process.env.LOG_OUTPUT,
	MYSQL_HOST: process.env.MYSQL_HOST,
	MYSQL_PORT: Number(process.env.MYSQL_PORT),
	MYSQL_USER: process.env.MYSQL_USER,
	MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
	MYSQL_DATABASE: process.env.MYSQL_DATABASE,
};

export default ENV;
