import { Request, Response } from "express";
import { handleError } from "../../lib";
import { ValidationError } from "../error";
import { Expedition } from "../../models/expedition.model";

export const getExpeditions = async (_: Request, res: Response) => {
	try {
		const expeditions = await Expedition.find({});
		
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
