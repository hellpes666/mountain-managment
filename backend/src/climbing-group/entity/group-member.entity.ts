import {
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript';
import { ClimbingGroup } from './climbing-group.entity';
import { Climber } from 'src/climber/entity/climber.entity';

@Table({ tableName: 'group-members' })
export class GroupMember extends Model<GroupMember> {
	@ForeignKey(() => ClimbingGroup)
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
	})
	group_id: number;

	@ForeignKey(() => Climber)
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
	})
	climber_id: number;
}
