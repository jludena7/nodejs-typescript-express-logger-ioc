import pretty, { PinoPretty } from "pino-pretty";
import moment from "moment-timezone";
import pino, { Logger } from "pino";
import ENV from "../env";
import { LOG_OUTPUT } from "../constants/app.constants";
import DateHelper from "../helpers/date.helper";

export default class AppLoggerConfig {
	static logger(): Logger {
		const modeStream = (): PinoPretty.PrettyStream => {
			if (ENV.LOG_OUTPUT === LOG_OUTPUT.FILE) {
				const dateString: string = DateHelper.formatDateToYYYYMMDD(new Date());
				const pathFile: string = `logs/app-${dateString}.log`;
				return pretty({
					translateTime: "SYS:yyyy-mm-dd'T'HH:MM:sso",
					ignore: "pid,hostname",
					destination: pathFile,
				});
			}
			return pretty({
				sync: true,
				colorize: true,
				translateTime: "SYS:yyyy-mm-dd'T'HH:MM:sso",
				ignore: "pid,hostname",
			});
		};

		return pino(
			{
				level: ENV.LOG_LEVEL,
				formatters: {
					level: (label: string) => ({ level: label.toUpperCase() }),
				},
				timestamp: (): string =>
					`,"timestamp":"${moment()
						.tz("America/Lima")
						.format("YYYY-MM-DDTHH:mm:ss.SSSZ")}"`,
			},
			modeStream()
		) as Logger;
	}
}
