import { ApiProperty } from '@nestjs/swagger';

export class MountainEntity {
    @ApiProperty({ example: 'a3d2c9c4-1234-4567-89ab-cdef12345678' })
    id: string;

    @ApiProperty({ example: 'Эверест' })
    name: string;

    @ApiProperty({ example: 8848 })
    height: number;

    @ApiProperty({ example: 'Непал' })
    country: string;

    @ApiProperty({ example: 'Гималаи' })
    region: string;
}
