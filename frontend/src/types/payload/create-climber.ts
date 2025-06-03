import type { Climber } from '@/entity';

export type CreateClimber = Pick<Climber, 'fullName' | 'address' | 'phoneNumber'>;
