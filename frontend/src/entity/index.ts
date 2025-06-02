import { type Climber } from './climber';
import { type EmergencyContact } from './emergencyContact';
import { type Group } from './group';
import { type Mountain } from './mountain';
import { type User } from './user';

export type TableData = keyof Climber | keyof EmergencyContact | keyof Group | keyof Mountain | keyof User;

export type { Climber, EmergencyContact, Group, Mountain, User };
