import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { isValidPhone } from '../lib/isValidPhone';

export interface IEmergencyContact {
	firstName: string;
	lastName: string;
	phone: string;
	relation: string;
}

interface EmegencyContactsCreationAttributes extends EmergencyContact {}

@Table({ tableName: 'emergency_contacts' })
export class EmergencyContact extends Model<
	EmergencyContact,
	EmegencyContactsCreationAttributes
> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		primaryKey: true,
	})
	emergency_contact_id: number;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	firstName: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	lastName: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
		validate: {
			isValidPhone,
		},
	})
	phone: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	relation: string;
}
