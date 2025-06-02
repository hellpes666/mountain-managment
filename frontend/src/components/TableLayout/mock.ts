// mockData.ts

import { type Climber, type EmergencyContact, type Group, type Mountain, type User } from '@/entity';
import { Relationship } from '@/entity/emergencyContact';
import { Role } from '@/entity/user';

export const climberMockData: Climber[] = [
	{
		id: '1',
		fullName: 'Иван Иванов',
		address: 'Москва, ул. Ленина, д. 1',
		createdAt: new Date('2023-01-01'),
		updatedAt: new Date('2023-01-02'),
		phoneNumber: '+7 (999) 123-45-67',
		userId: '1',
		user: {
			id: '1',
			email: 'ivan.ivanov@example.com',
			firstName: 'Иван',
			lastName: 'Иванов',
			role: Role.USER,
			createdAt: new Date('2023-01-01'),
			updatedAt: new Date('2023-01-02'),
		},
		emergencyContacts: [
			{
				id: '1',
				fullName: 'Мария Иванова',
				relationship: Relationship.WIFE,
				phoneNumber: '+7 (999) 987-65-43',
				email: 'maria.ivanova@example.com',
				address: 'Москва, ул. Пушкина, д. 3',
				climberId: '1',
				createdAt: new Date('2023-01-15'),
				updatedAt: new Date('2023-01-16'),
				climber: {} as Climber, // Замените на реальный объект Climber, если нужно
			},
		],
		groups: [],
	},
	{
		id: '2',
		fullName: 'Петр Петров',
		address: 'Санкт-Петербург, ул. Невский пр., д. 2',
		createdAt: new Date('2023-02-01'),
		updatedAt: new Date('2023-02-02'),
		phoneNumber: '+7 (999) 234-56-78',
		userId: '2',
		user: {
			id: '2',
			email: 'petr.petrov@example.com',
			firstName: 'Петр',
			lastName: 'Петров',
			role: Role.USER,
			createdAt: new Date('2023-02-01'),
			updatedAt: new Date('2023-02-02'),
		},
		emergencyContacts: [],
		groups: [],
	},
];

export const emergencyContactMockData: EmergencyContact[] = [
	{
		id: '1',
		fullName: 'Мария Иванова',
		relationship: Relationship.WIFE,
		phoneNumber: '+7 (999) 987-65-43',
		email: 'maria.ivanova@example.com',
		address: 'Москва, ул. Пушкина, д. 3',
		climberId: '1',
		createdAt: new Date('2023-01-15'),
		updatedAt: new Date('2023-01-16'),
		climber: climberMockData[0], // Привязка к существующему Climber
	},
	{
		id: '2',
		fullName: 'Алексей Петров',
		relationship: Relationship.FRIEND,
		phoneNumber: '+7 (999) 876-54-32',
		email: 'aleksey.petrov@example.com',
		address: 'Санкт-Петербург, ул. Маяковского, д. 4',
		climberId: '2',
		createdAt: new Date('2023-02-15'),
		updatedAt: new Date('2023-02-16'),
		climber: climberMockData[1], // Привязка к существующему Climber
	},
];

export const groupMockData: Group[] = [
	{
		id: '1',
		name: 'Группа А',
		startDate: '2023-03-01',
		endDate: '2023-03-10',
		mountainId: '1',
		createdAt: new Date('2023-02-01'),
		updatedAt: new Date('2023-02-02'),
		mountain: {
			id: '1',
			name: 'Эльбрус',
			height: 5642,
			country: 'Россия',
			region: 'Кавказ',
			createdAt: new Date('2023-01-01'),
			updatedAt: new Date('2023-01-02'),
			groups: [],
		},
		climbers: [climberMockData[0], climberMockData[1]],
	},
	{
		id: '2',
		name: 'Группа B',
		startDate: '2023-04-01',
		endDate: '2023-04-10',
		mountainId: '2',
		createdAt: new Date('2023-03-01'),
		updatedAt: new Date('2023-03-02'),
		mountain: {
			id: '2',
			name: 'Монблан',
			height: 4807,
			country: 'Франция',
			region: 'Альпы',
			createdAt: new Date('2023-02-01'),
			updatedAt: new Date('2023-02-02'),
			groups: [],
		},
		climbers: [climberMockData[0]],
	},
];

export const mountainMockData: Mountain[] = [
	{
		id: '1',
		name: 'Эльбрус',
		height: 5642,
		country: 'Россия',
		region: 'Кавказ',
		createdAt: new Date('2023-01-01'),
		updatedAt: new Date('2023-01-02'),
		groups: [],
	},
	{
		id: '2',
		name: 'Монблан',
		height: 4807,
		country: 'Франция',
		region: 'Альпы',
		createdAt: new Date('2023-02-01'),
		updatedAt: new Date('2023-02-02'),
		groups: [],
	},
];

export const userMockData: User[] = [
	{
		id: '1',
		email: 'ivan.ivanov@example.com',
		firstName: 'Иван',
		lastName: 'Иванов',
		role: Role.USER,
		createdAt: new Date('2023-01-01'),
		updatedAt: new Date('2023-01-02'),
		climber: climberMockData[0],
	},
	{
		id: '2',
		email: 'petr.petrov@example.com',
		firstName: 'Петр',
		lastName: 'Петров',
		role: Role.USER,
		createdAt: new Date('2023-02-01'),
		updatedAt: new Date('2023-02-02'),
		climber: climberMockData[1],
	},
];
