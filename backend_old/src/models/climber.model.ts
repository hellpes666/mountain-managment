import mongoose, { Model, Schema } from "mongoose";

export interface IClimber {
	firstName: string;
	lastName: string;
	dateOfBirth: Date;
	nationality: string;
	email: string;
	phone: string;
	address: {
		street: string;
		city: string;
		country: string;
		postalCode: string;
	};
	emergencyContact?: {
		name: string;
		relationship: string;
		phone: string;
	};
}

type ClimberModel = Model<IClimber>;

const ClimberSchema = new Schema<IClimber, ClimberModel>(
	{
		firstName: {
			type: String,
			required: [true, "Имя обязательно"],
			trim: true,
			maxlength: [50, "Имя не может превышать 50 символов"],
		},
		lastName: {
			type: String,
			required: [true, "Фамилия обязательна"],
			trim: true,
			index: true,
		},
		dateOfBirth: {
			type: Date,
			required: [true, "Дата рождения обязательна"],
			validate: {
				validator: (dob: Date) =>
					dob < new Date() && dob > new Date("1900-01-01"),
				message: "Дата должна быть между 1900 и текущей датой",
			},
		},
		nationality: {
			type: String,
			required: [true, "Национальность обязательна"],
			match: [/^[A-Z]{3}$/, "Используйте 3-буквенный код ISO страны"],
		},
		email: {
			type: String,
			required: [true, "Email обязателен"],
			unique: true,
			match: [/^\S+@\S+\.\S+$/, "Некорректный email"],
		},
		phone: {
			type: String,
			validate: {
				validator: (v: string) => /^\+?\d{7,15}$/.test(v),
				message: "Некорректный номер телефона",
			},
		},
		address: {
			street: { type: String, required: true },
			city: { type: String, required: true },
			country: { type: String, required: true },
			postalCode: { type: String, required: true },
		},
		emergencyContact: {
			name: String,
			relationship: String,
			phone: String,
		},
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
		},
		toObject: { virtuals: true },
	}
);

ClimberSchema.virtual("age").get(function () {
	const today = new Date();
	const birthDate = new Date(this.dateOfBirth);
	let age = today.getFullYear() - birthDate.getFullYear();
	const monthDiff = today.getMonth() - birthDate.getMonth();
	if (
		monthDiff < 0 ||
		(monthDiff === 0 && today.getDate() < birthDate.getDate())
	) {
		age--;
	}
	return age;
});

export const Climber = mongoose.model<IClimber, ClimberModel>(
	"Climber",
	ClimberSchema
);
