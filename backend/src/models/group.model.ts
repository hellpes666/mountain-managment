import mongoose, { Model, Schema } from "mongoose";

interface IGroup {
	group_name: string;
	mountains: Array<Schema.Types.ObjectId>;
	createdAt?: Date;
	updatedAt?: Date;
}

type GroupModel = Model<IGroup>;

const GroupSchema = new Schema<IGroup, GroupModel>(
	{
		group_name: {
			type: String,
			required: [true, "Название группы обязательно"],
			unique: true,
			trim: true,
			maxlength: [100, "Название не может превышать 100 символов"],
		},
		mountains: [
			{
				type: Schema.Types.ObjectId,
				ref: "Mountain",
			},
		],
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

export const Group = mongoose.model<IGroup, GroupModel>("Group", GroupSchema);
