import app from "./app";
import ENV from "./src/common/env";
import appLogger from "./src/common/logger";

app.listen(ENV.APP_PORT, (): void => {
	appLogger.info(`App running on http://localhost:${ENV.APP_PORT}`);
});
