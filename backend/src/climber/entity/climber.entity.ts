import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { isValidPhone } from '../lib/isValidPhone';
import { EmergencyContact } from './emegrency-contacts.entity';

@Table({ tableName: 'climbers' })
export class Climber extends Model {
	@Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
	climber_id: number;

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
	address: string;

	@Column({ type: DataType.INTEGER, defaultValue: 0 })
	experience_in_months: number;

	@Column({ type: DataType.INTEGER, defaultValue: 0 })
	total_successful_ascents: number;

	@HasMany(() => EmergencyContact)
	emergency_contacts: EmergencyContact[];
}
