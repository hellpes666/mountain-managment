import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { isValidPhone } from '../lib/isValidPhone';
import {
	EmergencyContact,
	IEmergencyContact,
} from './emegrency-contacts.entity';

interface ClimberCreationAttributes {
	firstName: string;
	lastName: string;
	phone: string;
	address: string;
	emergencyContacts: IEmergencyContact[];
}

@Table({ tableName: 'climbers' })
export class Climber extends Model<Climber, ClimberCreationAttributes> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	climber_id: number;

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
	address: string;

	@HasMany(() => EmergencyContact)
	emergencyContacts: EmergencyContact[];
}
