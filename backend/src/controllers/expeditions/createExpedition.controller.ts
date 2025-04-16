import { Request, Response } from "express";
import { handleError } from "../../lib";
import { ValidationError } from "../error";
import { Group, IGroup } from "../../models/group.model";
import { IExpedition } from "../../models/expedition.model";

export const createExpedtion = async (
	req: Request<{}, {}, IExpedition>,
	res: Response
) => {
	try {
		const { group_id, mountain_id, status, start_date, end_date } =
			req.body;

		const requiredFields = [
			{ field: "group_id", value: group_id },
			{ field: "mountain_id", value: mountain_id },
			{ field: "status", value: status },
			{ field: "start_date", value: start_date },
			{ field: "end_date", value: end_date },
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
