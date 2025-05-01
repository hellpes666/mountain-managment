import { Sequelize } from 'sequelize-typescript';
import { Climber } from 'src/climber/entity/climber.entity';
import { EmergencyContact } from 'src/climber/entity/emegrency-contacts.entity';

export const databaseProviders = [
	{
		provide: 'SEQUELIZE',
		useFactory: async () => {
			const sequelize = new Sequelize({
				dialect: 'postgres',
				host: process.env.LOCAL_DB_HOST,
				port: Number(process.env.LOCAL_DB_PORT),
				username: process.env.LOCAL_DB_USERNAME,
				password: process.env.LOCAL_DB_PASSWORD,
				database: process.env.LOCAL_DB,
				models: [Climber, EmergencyContact],
			});
			await sequelize.sync();
			return sequelize;
		},
	},
];
