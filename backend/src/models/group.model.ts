import mongoose, { Model, Schema } from "mongoose";

export interface IGroup {
	group_name: string;
	climbers: Array<Schema.Types.ObjectId>;
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
		climbers: [
			{
				type: Schema.Types.ObjectId,
				ref: "Climber",
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
