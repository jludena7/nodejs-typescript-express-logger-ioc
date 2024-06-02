import AppLogger from "./app-logger";
import AppLoggerConfig from "./app-logger.config";

const appLogger = new AppLogger(AppLoggerConfig.logger());

export default appLogger;
