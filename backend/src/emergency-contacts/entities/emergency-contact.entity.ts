import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript';
import { isValidPhone } from '../../climber/lib/isValidPhone';
import { Climber } from '../../climber/entity/climber.entity';

@Table({ tableName: 'emergency_contacts' })
export class EmergencyContact extends Model {
	@Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
	emergency_contact_id: number;

	@Column({ type: DataType.STRING, allowNull: false })
	first_name: string;

	@Column({ type: DataType.STRING, allowNull: false })
	last_name: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
		validate: { isValidPhone },
	})
	phone: string;

	@Column({ type: DataType.STRING, allowNull: false })
	relation: string;

	@ForeignKey(() => Climber)
	@Column({ type: DataType.INTEGER })
	climber_id: number;

	@BelongsTo(() => Climber)
	climber: Climber;
}
