import mongoose, { Model, Schema } from "mongoose";

interface IGroup {
	group_name: string;
	mountains: Array<Schema.Types.ObjectId>;
	start_date: Date;
	end_date: Date;
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
		start_date: {
			required: [true, "Дата начала восхода обязательна"],
			type: Date,
			validate: {
				validator: function (this: IGroup, value: Date) {
					return value < this.end_date;
				},
				message: "Дата начала должна быть раньше даты окончания",
			},
		},
		end_date: {
			requierd: [true, "Дата окончания экспедиции горы обязательна"],
			type: Date,
		},
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

GroupSchema.pre("deleteOne", async function(next) {
	const groupId = this.getFilter()._id;
	await mongoose.model("Expedition").deleteMany({ group: groupId });
	next();
  });
  

export const Group = mongoose.model<IGroup, GroupModel>("Group", GroupSchema);
