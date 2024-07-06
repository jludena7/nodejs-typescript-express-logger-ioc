import { validate } from "class-validator";
import ValidatorRequest, {
	ValidatorRequestInterface,
} from "../../app/src/common/validator.request";
import { HTTP } from "../../app/src/common/constants/app.constants";
import BodyExceptionInterface from "../../app/src/common/exceptions/interfaces/body-exception.interface";

jest.mock("class-validator", () => ({
	validate: jest.fn(),
}));

describe("ValidatorRequest", () => {
	const mockValidate = validate as jest.MockedFunction<typeof validate>;
	const errorBody = {
		statusCode: HTTP.STATUS_403,
		error: "EMULATE_ERROR",
		message: "Emulate error",
	} as BodyExceptionInterface;

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("validate", () => {
		it("should return hasError true when there are validation errors", async () => {
			const params = { name: "" };
			const validationError = [
				{
					property: "",
					constraints: { isNotEmpty: JSON.stringify(errorBody) },
				},
			];

			mockValidate.mockResolvedValue(validationError);

			const result: ValidatorRequestInterface =
				await ValidatorRequest.validate(params);

			expect(result.hasError).toBe(true);
			expect(result.bodyError).toEqual(errorBody);
		});

		it("should return hasError false when there are no validation errors", async () => {
			const params = { name: "validName" };

			mockValidate.mockResolvedValue([]);

			const result: ValidatorRequestInterface =
				await ValidatorRequest.validate(params);

			expect(result.hasError).toBe(false);
			expect(result.bodyError).toBeNull();
		});
	});

	describe("parseErrors", () => {
		it("should correctly parse validation errors", async () => {
			const validationError = [
				{
					property: "",
					constraints: { isNotEmpty: JSON.stringify(errorBody) },
				},
			];

			mockValidate.mockResolvedValue(validationError);

			const result = await ValidatorRequest.validate({}, {});

			expect(result).toEqual({
				hasError: true,
				bodyError: errorBody,
			});
		});

		it("should correctly parse nested validation errors", async () => {
			const validationError = [
				{
					property: "",
					children: [
						{
							property: "",
							constraints: { isNotEmpty: JSON.stringify(errorBody) },
						},
					],
				},
			];

			mockValidate.mockResolvedValue(validationError);

			const result = await ValidatorRequest.validate({}, {});

			expect(result).toEqual({
				hasError: true,
				bodyError: errorBody,
			});
		});
	});
});
