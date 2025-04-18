import mongoose, { Model, Schema } from "mongoose";

export type ExpeditionType = "planned" | "completed" | "cancelled";

export interface IExpedition {
	group_id: Schema.Types.ObjectId;
	mountain_id: Schema.Types.ObjectId;
	status: ExpeditionType;
	start_date: Date;
	end_date: Date;
}

type ExpeditionModel = Model<IExpedition>;

const ExpeditionSchema = new Schema<IExpedition, ExpeditionModel>(
	{
		group_id: {
			required: [true, "Группа обязательна для заполнения"],
			type: Schema.Types.ObjectId,
			ref: "Group",
		},
		mountain_id: {
			required: [true, "Гора обязаательна для заполнения"],
			type: Schema.Types.ObjectId,
			ref: "Mountain",
		},
		status: {
			requierd: [true, "Дата окончания экспедиции горы обязательна"],
			type: String,
			validate: {
				validator: function (this: IExpedition, value: ExpeditionType) {
					return (
						["planned", "completed", "cancelled"].indexOf(value) !==
						-1
					);
				},
			},
		},
		start_date: {
			required: [true, "Дата начала восхода обязательна"],
			type: Date,
			validate: {
				validator: function (this: IExpedition, value: Date) {
					return value < this.end_date;
				},
				message: "Дата начала должна быть раньше даты окончания",
			},
		},
		end_date: {
			type: Date,
		},
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

export const Expedition = mongoose.model<IExpedition, ExpeditionModel>(
	"Expedition",
	ExpeditionSchema
);
