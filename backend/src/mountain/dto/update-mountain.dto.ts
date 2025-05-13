import { PartialType } from '@nestjs/mapped-types';
import { CreateMountainDto } from './create-mountain.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
//TODO нельзя апдейтить или удалять если есть восхождения
export class UpdateMountainDto extends PartialType(CreateMountainDto) {
    @ApiPropertyOptional({
        description: 'Название горы',
        example: 'Эверест',
        minLength: 2,
        maxLength: 256,
    })
    name?: string;

    @ApiPropertyOptional({
        description: 'Высота горы в метрах',
        example: 8848,
        minimum: 200,
    })
    height?: number;

    @ApiPropertyOptional({
        description: 'Страна, в которой находится гора',
        example: 'Непал',
    })
    country?: string;

    @ApiPropertyOptional({
        description: 'Регион, в котором находится гора',
        example: 'Гималаи',
    })
    region?: string;
}
