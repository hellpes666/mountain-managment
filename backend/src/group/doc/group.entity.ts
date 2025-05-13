import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GroupEntity {
    id: string;

    @ApiProperty({ example: 'Экспедиция на Эверест' })
    name: string;

    @ApiProperty({ example: '15-06-2025 08:00' })
    startDate?: string;

    @ApiPropertyOptional({ example: '30-06-2025 18:00' })
    endDate?: string;

    @ApiProperty({ example: 'a3d2c9c4-1234-4567-89ab-cdef12345678' })
    mountainId: string;
}
