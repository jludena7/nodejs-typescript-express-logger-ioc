import { NUMBER } from "../../../app/src/common/constants/app.constants";
import DateHelper from "../../../app/src/common/helpers/date.helper";

describe("DateHelper", () => {
	describe("formatDateToYYYYMMDD", () => {
		it("should format date correctly to YYYYMMDD", () => {
			const date = new Date(2023, NUMBER.ZERO, NUMBER.ONE);
			const formattedDate = DateHelper.formatDateToYYYYMMDD(date);
			expect(formattedDate).toBe("20230101");
		});

		it("should handle months and days less than 10 correctly", () => {
			const date = new Date(2023, NUMBER.ONE, NUMBER.TWO);
			const formattedDate = DateHelper.formatDateToYYYYMMDD(date);
			expect(formattedDate).toBe("20230202");
		});
	});
});
