import { NUMBER } from "../constants/app.constants";

export default class DateHelper {
	static formatDateToYYYYMMDD(date: Date): string {
		const year = date.getFullYear();
		const month = String(date.getMonth() + NUMBER.ONE).padStart(
			NUMBER.TWO,
			String(NUMBER.ZERO)
		);
		const day = String(date.getDate()).padStart(
			NUMBER.TWO,
			String(NUMBER.ZERO)
		);

		return `${year}${month}${day}`;
	}
}
