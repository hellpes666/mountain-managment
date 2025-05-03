import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript';
import { ClimbingGroup } from './climbing-group.entity';
import { Climber } from 'src/climber/entity/climber.entity';

enum MemberRole {
	leader = 'LEADER',
	member = 'MEMBER',
	guide = 'GUIDE',
}

enum MemberStatus {
	active = 'ACTIVE',
	injured = 'INJURED',
	withdrew = 'WITHDREW',
}

@Table({ tableName: 'group_members' })
export class GroupMember extends Model {
	@ForeignKey(() => ClimbingGroup)
	@Column({ type: DataType.INTEGER, primaryKey: true })
	group_id: number;

	@BelongsTo(() => ClimbingGroup)
	group: ClimbingGroup;

	@ForeignKey(() => Climber)
	@Column({ type: DataType.INTEGER, primaryKey: true })
	climber_id: number;

	@BelongsTo(() => Climber)
	climber: Climber;

	@Column({
		type: DataType.ENUM(...Object.values(MemberRole)),
		allowNull: false,
	})
	role: MemberRole;

	@Column({
		type: DataType.ENUM(...Object.values(MemberStatus)),
		allowNull: false,
		defaultValue: MemberStatus.active,
	})
	status: MemberStatus;

	@Column({ type: DataType.BOOLEAN, defaultValue: false })
	is_reached: boolean;
}
