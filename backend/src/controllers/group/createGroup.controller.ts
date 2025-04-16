import { Request, Response } from "express";
import { handleError } from "../../lib";
import { ValidationError } from "../error";
import { Group, IGroup } from "../../models/group.model";
import { Climber } from "../../models/climber.model";

export const createGroup = async (
	req: Request<{}, {}, IGroup>,
	res: Response
) => {
	try {
		const { group_name, climbers, mountain } = req.body;

		const requiredFields = [
			{ field: "group_name", value: group_name },
			{ field: "climbers", value: climbers },
			{ field: "mountain", value: mountain },
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

		const newGroup = new Group({
			group_name,
			climbers,
			mountain,
		});

		const validationError = newGroup.validateSync();

		if (validationError) {
			throw validationError;
		}

		const savedGroup = await newGroup.save();

		res.status(201).json({
			message: "Группа успешно создана",

			data: savedGroup.toObject({ virtuals: true }),
		});
		return;
	} catch (error) {
		handleError({
			res,
			error,
			component: "createGroup",
			customStatusError:
				error instanceof ValidationError ? 400 : undefined,
		});
	}
};
