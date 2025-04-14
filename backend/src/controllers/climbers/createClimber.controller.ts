import { Request, Response } from "express";
import { handleError } from "../../lib";
import { Climber, IClimber } from "../../models/climber.model";
import { ValidationError } from "../error";

export const createClimber = async (
	req: Request<{}, {}, IClimber>,
	res: Response
) => {
	try {
		const {
			firstName,
			lastName,
			dateOfBirth,
			nationality,
			email,
			phone,
			address,
			emergencyContact,
		} = req.body;

		const requiredFields = [
			{ field: "firstName", value: firstName },
			{ field: "lastName", value: lastName },
			{ field: "dateOfBirth", value: dateOfBirth },
			{ field: "nationality", value: nationality },
			{ field: "email", value: email },
			{ field: "phone", value: phone },
			{ field: "address", value: address },
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

		const existingClimber = await Climber.findOne({ email });

		if (existingClimber) {
			throw new ValidationError("Email уже зарегистрирован", {
				field: "email",
				value: email,
			});
		}

		const newClimber = new Climber({
			firstName,
			lastName,
			dateOfBirth,
			nationality,
			email,
			phone,
			address,
			emergencyContact: emergencyContact || null,
		});

		const validationError = newClimber.validateSync();

		if (validationError) {
			throw validationError;
		}

		const savedClimber = await newClimber.save();

		res.status(201).json({
			success: true,
			data: savedClimber.toObject({ virtuals: true }),
		});
		return;
	} catch (error) {
		handleError({
			res,
			error,
			component: "createClimber",
			customStatusError:
				error instanceof ValidationError ? 400 : undefined,
		});
	}
};
