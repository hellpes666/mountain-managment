import { Request, Response } from "express";
import { handleError } from "../../lib";
import { ValidationError } from "../error";
import { IMountain, Mountain } from "../../models/mountain.model";

export const createMountain = async (
	req: Request<{}, {}, IMountain>,
	res: Response
) => {
	try {
		const { name, height, country, region } = req.body;

		const requiredFields = [
			{ field: "name", value: name },
			{ field: "height", value: height },
			{ field: "country", value: country },
			{ field: "region", value: region },
		];

		const missingFields = requiredFields
			.filter(({ value }) => !value)
			.map(({ field }) => field);

		if (missingFields.length > 0) {
			throw new ValidationError(
				`Отсутствуют обязательные поля: ${missingFields.join(", ")}`,
				{ missingFields }
			);
		}

		const newMountain = new Mountain({
			name,
			height,
			country,
			region,
		});

		const validationError = newMountain.validateSync();

		if (validationError) {
			throw validationError;
		}

		const savedMountain = await newMountain.save();

		res.status(201).json({
			success: true,
			data: savedMountain.toObject({ virtuals: true }),
		});
		return;
	} catch (error) {
		handleError({
			res,
			error,
			component: "createMountain",
			customStatusError:
				error instanceof ValidationError ? 400 : undefined,
		});
	}
};
