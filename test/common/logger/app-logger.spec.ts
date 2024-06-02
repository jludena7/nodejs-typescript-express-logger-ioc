import { Logger } from "pino";
import AppLogger from "../../../app/src/common/logger/app-logger";
import ENV from "../../../app/src/common/env";

jest.mock("pino");

describe("AppLogger", () => {
	let logger: jest.Mocked<Logger>;
	let appLogger: AppLogger;

	beforeEach(() => {
		logger = {
			child: jest.fn().mockReturnValue({
				debug: jest.fn(),
				info: jest.fn(),
				warn: jest.fn(),
				error: jest.fn(),
				fatal: jest.fn(),
				trace: jest.fn(),
			}),
		} as unknown as jest.Mocked<Logger>;

		ENV.LOG_ACTIVE = true;
		appLogger = new AppLogger(logger);
	});

	it("should log debug messages correctly", () => {
		appLogger.debug("Debug message %s", "test");
		expect(logger.child({}).debug).toHaveBeenCalledWith("Debug message test");
	});

	it("should log info messages correctly", () => {
		appLogger.info("Info message %s", "test");
		expect(logger.child({}).info).toHaveBeenCalledWith("Info message test");
	});

	it("should log warn messages correctly", () => {
		appLogger.warn("Warn message %s", "test");
		expect(logger.child({}).warn).toHaveBeenCalledWith("Warn message test");
	});

	it("should log error messages correctly", () => {
		appLogger.error("Error message %s", "test");
		expect(logger.child({}).error).toHaveBeenCalledWith("Error message test");
	});

	it("should log fatal messages correctly", () => {
		appLogger.fatal("Fatal message %s", "test");
		expect(logger.child({}).fatal).toHaveBeenCalledWith("Fatal message test");
	});

	it("should log trace messages correctly", () => {
		appLogger.trace("Trace message %s", "test");
		expect(logger.child({}).trace).toHaveBeenCalledWith("Trace message test");
	});

	it("should not log if LOG_ACTIVE is false", () => {
		ENV.LOG_ACTIVE = false;
		appLogger = new AppLogger(logger);

		appLogger.debug("Debug message %s", "test");
		expect(logger.child({}).debug).not.toHaveBeenCalled();
	});
});
