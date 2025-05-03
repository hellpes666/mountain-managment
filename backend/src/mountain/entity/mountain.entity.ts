import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ClimbingGroup } from 'src/climbing-group/entity/climbing-group.entity';

enum MountainDifficulty {
	easy = 'EASY',
	medium = 'MEDIUM',
	hard = 'HARD',
}

@Table({ tableName: 'mountains' })
export class Mountain extends Model {
	@Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
	mountain_id: number;

	@Column({ type: DataType.STRING, allowNull: false })
	name: string;

	@Column({ type: DataType.FLOAT, allowNull: false })
	height: number;

	@Column({ type: DataType.STRING, allowNull: false })
	country: string;

	@Column({ type: DataType.STRING, allowNull: false })
	region: string;

	@Column({
		type: DataType.ENUM(...Object.values(MountainDifficulty)),
		allowNull: false,
	})
	difficulty: MountainDifficulty;

	@Column({ type: DataType.INTEGER, defaultValue: 0 })
	total_ascents: number;

	@HasMany(() => ClimbingGroup)
	climbing_groups: ClimbingGroup[];
}
