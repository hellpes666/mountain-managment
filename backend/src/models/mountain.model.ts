import mongoose, { Model, Schema } from "mongoose";

interface IMountain {
	name: string;
	height: number;
	country: string;
	region: string;
	createdAt?: Date;
	updatedAt?: Date;
}

type MountainModel = Model<IMountain>;

const MountainSchema = new Schema<IMountain, MountainModel>(
	{
		name: {
			type: String,
			required: [true, "Название вершины обязательно"],
			unique: true,
			trim: true,
			maxlength: [100, "Название не может превышать 100 символов"],
		},
		height: {
			type: Number,
			required: [true, "Высота обязательна"],
			min: [1, "Высота должна быть положительным числом"],
		},
		country: {
			type: String,
			required: [true, "Страна обязательна"],
			trim: true,
		},
		region: {
			type: String,
			required: [true, "Регион обязателен"],
			trim: true,
		},
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

export const Mountain = mongoose.model<IMountain, MountainModel>(
	"Mountain",
	MountainSchema
);
