import type { Mountain } from '@/entity';

export type CreateMountain = Pick<Mountain, 'name' | 'height' | 'country' | 'region'>;
