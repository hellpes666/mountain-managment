import {
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript';
import { Mountain } from 'src/mountain/entity/mountain.entity';

interface ClimbingGroupCreationAttributes {
	group_name: string;
	mountain_id: number;
	start_date: Date;
	end_date: Date;
}

@Table({ tableName: 'climbing-groups' })
export class ClimbingGroup extends Model<
	ClimbingGroup,
	ClimbingGroupCreationAttributes
> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	climbing_group_id: number;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	group_name: string;

	@Column({
		type: DataType.FLOAT,
		allowNull: false,
	})
	height: number;

	@ForeignKey(() => Mountain)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	mountain_id: number;

	@Column({
		type: DataType.DATE,
		allowNull: false,
	})
	start_date: Date;

	@Column({
		type: DataType.DATE,
		allowNull: false,
	})
	end_date: Date;
}
