import { Request, Response } from "express";
import { handleError } from "../../lib";
import { ValidationError } from "../error";
import { Expedition } from "../../models/expedition.model";

export const getExpeditions = async (_: Request, res: Response) => {
	try {
		const expeditions = await Expedition.find({})
			.populate({
				path: "group_id",
				select: "group_name climbers",
				populate: {
					path: "climbers",
					select: "firstName lastName dateOfBirth nationality email phone address emergencyContact",
				},
			})
			.populate({
				path: "mountain_id",
				select: "name height country region",
			})
			.lean();

		res.status(200).send({ message: "Экспедиции", data: expeditions });
		return;
	} catch (error) {
		handleError({
			res,
			error,
			component: "getExpeditions",
			customStatusError:
				error instanceof ValidationError ? 400 : undefined,
		});
	}
};
