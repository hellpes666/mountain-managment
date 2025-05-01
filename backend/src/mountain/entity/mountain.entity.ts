import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface MountainCreationAttributes {
	name: string;
	height: number; // meters
	country: string;
	region: string;
}

@Table({ tableName: 'mountains' })
export class Mountain extends Model<Mountain, MountainCreationAttributes> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	mountain_id: number;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	name: string;

	@Column({
		type: DataType.FLOAT,
		allowNull: false,
	})
	height: number;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	country: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	region: string;
}
