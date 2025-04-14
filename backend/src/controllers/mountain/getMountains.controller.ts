import { Request, Response } from "express";
import { handleError } from "../../lib";
import { ValidationError } from "../error";
import { Mountain } from "../../models/mountain.model";

export const getMountains = async (_: Request, res: Response) => {
	try {
		const mountains = await Mountain.find({});

		if (mountains.length === 0) {
			res.status(200).send({
				message: "Гор не найдено",
				data: [],
			});
			return;
		}

		res.status(200).send({ message: "Горы", data: mountains });
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
