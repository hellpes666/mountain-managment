import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString, Length, Min } from 'class-validator';

export class CreateMountainDto {
    @ApiProperty({
        description: 'Название горы',
        example: 'Эверест',
        minLength: 2,
        maxLength: 256,
    })
    @IsString()
    @IsNotEmpty()
    @Length(2, 256)
    readonly name: string;

    @ApiProperty({
        description: 'Высота горы в метрах',
        example: 8848,
        minimum: 200,
    })
    @IsNumber()
    @IsPositive()
    @Min(200)
    readonly height: number;

    @ApiProperty({
        description: 'Страна, в которой находится гора',
        example: 'Непал',
    })
    @IsString()
    @IsNotEmpty()
    readonly country: string;

    @ApiProperty({
        description: 'Регион, в котором находится гора',
        example: 'Гималаи',
    })
    @IsString()
    @IsNotEmpty()
    readonly region: string;
}
