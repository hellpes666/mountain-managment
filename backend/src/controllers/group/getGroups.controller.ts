import { Request, Response } from "express";
import { handleError } from "../../lib";
import { ValidationError } from "../error";
import { Mountain } from "../../models/mountain.model";
import { Group } from "../../models/group.model";

export const getGroups = async (_: Request, res: Response) => {
	try {
		const groups = await Group.find({});

		if (groups.length === 0) {
			res.status(200).send({
				message: "Групп не найдено",
				data: [],
			});
			return;
		}

		res.status(200).send({ message: "Группы", data: groups });
		return;
	} catch (error) {
		handleError({
			res,
			error,
			component: "getGroups",
			customStatusError:
				error instanceof ValidationError ? 400 : undefined,
		});
	}
};
