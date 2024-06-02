import ENV from "../../../app/src/common/env";
import AppLoggerConfig from "../../../app/src/common/logger/app-logger.config";
import { LOG_OUTPUT } from "../../../app/src/common/constants/app.constants";

describe("AppLoggerConfig", () => {
	describe("logger", () => {
		afterEach(() => {
			jest.clearAllMocks();
		});

		it("should return a logger with correct options for console output", () => {
			ENV.LOG_OUTPUT = "console";

			AppLoggerConfig.logger();

			expect(ENV.LOG_OUTPUT).toEqual(LOG_OUTPUT.CONSOLE);
		});

		it("should return a logger with correct options for file output", () => {
			ENV.LOG_OUTPUT = "file";

			AppLoggerConfig.logger();

			expect(ENV.LOG_OUTPUT).toEqual(LOG_OUTPUT.FILE);
		});
	});
});
