import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	Table,
} from 'sequelize-typescript';
import { Mountain } from 'src/mountain/entity/mountain.entity';
import { GroupMember } from './group-member.entity';

enum ClimbingStatus {
	planned = 'PLANNED',
	in_progress = 'IN PROGRESS',
	completed = 'COMPLETED',
	cancelled = 'CANCELLED',
}

@Table({ tableName: 'climbing_groups' })
export class ClimbingGroup extends Model {
	@Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
	climbing_group_id: number;

	@Column({ type: DataType.STRING, allowNull: false })
	group_name: string;

	@ForeignKey(() => Mountain)
	@Column({ type: DataType.INTEGER, allowNull: false })
	mountain_id: number;

	@BelongsTo(() => Mountain)
	mountain: Mountain;

	@Column({ type: DataType.DATE, defaultValue: null })
	start_date: Date;

	@Column({ type: DataType.DATE, defaultValue: null })
	end_date: Date;

	@Column({
		type: DataType.ENUM(...Object.values(ClimbingStatus)),
		allowNull: false,
	})
	status: ClimbingStatus;

	@Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
	is_successful: boolean;

	@HasMany(() => GroupMember)
	group_members: GroupMember[];
}
