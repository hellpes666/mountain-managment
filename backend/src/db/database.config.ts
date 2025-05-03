import type { SequelizeOptions } from 'sequelize-typescript';
import { Climber } from '../climber/entity/climber.entity';
import { EmergencyContact } from '../emergency-contacts/entities/emergency-contact.entity';
import { ClimbingGroup } from '../climbing-group/entity/climbing-group.entity';
import { GroupMember } from '../climbing-group/entity/group-member.entity';
import { Mountain } from '../mountain/entity/mountain.entity';

export const databaseConfig: SequelizeOptions = {
	dialect: 'postgres',
	host: process.env.POSTGRES_HOST,
	port: Number(process.env.POSTGRES_PORT),
	username: process.env.POSTGRES_USER,
	password: String(process.env.POSTGRES_PASSWORD),
	database: process.env.POSTGRES_DATABASE,
	models: [Climber, ClimbingGroup, GroupMember, EmergencyContact, Mountain],
	logging: false,
	dialectOptions: {
		ssl: false,
	},
	sync: {
		force: false,
		alter: true,
	},
};
