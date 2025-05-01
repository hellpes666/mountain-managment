import { Request, Response } from "express";
import { handleError } from "../../lib";
import { Climber } from "../../models/climber.model";
import { ValidationError } from "../error";

export const getClimbers = async (_: Request, res: Response) => {
	try {
		const climbers = await Climber.find({});

		if (climbers.length === 0) {
			res.status(200).send({
				message: "Альпинистов не найдено",
				data: [],
			});
			return;
		}

		res.status(200).send({ message: "Альпинисты", data: climbers });
		return;
	} catch (error) {
		handleError({
			res,
			error,
			component: "getClimbers",
			customStatusError:
				error instanceof ValidationError ? 400 : undefined,
		});
	}
};
