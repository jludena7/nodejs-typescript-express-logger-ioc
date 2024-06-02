import util from "util";
import { Logger } from "pino";
import _ from "lodash";
import ENV from "../env";

interface AppLoggerInterface {
	debug(message: string, ...args: any[]): void;
	info(message: string, ...args: any[]): void;
	warn(message: string, ...args: any[]): void;
	error(message: string, ...args: any[]): void;
	fatal(message: string, ...args: any[]): void;
	trace(message: string, ...args: any[]): void;
}

export default class AppLogger implements AppLoggerInterface {
	private logger: Logger;

	constructor(logger: Logger) {
		if (ENV.LOG_ACTIVE) {
			this.logger = logger.child({});
		} else {
			this.logger = new Proxy({}, { get: () => _.noop }) as Logger;
		}
	}

	debug(smg: string, ...args: any[]): void {
		this.logger.debug(util.format(smg, ...args));
	}

	info(smg: string, ...args: any[]): void {
		this.logger.info(util.format(smg, ...args));
	}

	warn(smg: string, ...args: any[]): void {
		this.logger.warn(util.format(smg, ...args));
	}

	error(smg: string, ...args: any[]): void {
		this.logger.error(util.format(smg, ...args));
	}

	fatal(smg: string, ...args: any[]): void {
		this.logger.fatal(util.format(smg, ...args));
	}

	trace(smg: string, ...args: any[]): void {
		this.logger.trace(util.format(smg, ...args));
	}
}
