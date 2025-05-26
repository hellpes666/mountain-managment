import { IsNotEmpty, IsString, Length, Matches, IsUUID, ArrayNotEmpty, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClimberDto {
    @ApiProperty({
        description: 'Полное имя альпиниста',
        example: 'Иван Иванов',
        minLength: 2,
        maxLength: 256,
    })
    @IsString()
    @IsNotEmpty()
    @Length(2, 256)
    readonly fullName: string;

    @ApiProperty({
        description: 'Адрес проживания альпиниста',
        example: 'г. Москва, ул. Ленина, д. 10',
        minLength: 10,
        maxLength: 256,
    })
    @IsString()
    @IsNotEmpty()
    @Length(10, 256)
    readonly address: string;

    @ApiProperty({
        description: 'Номер телефона в формате: +x (xxx) xxx-xx-xx',
        example: '+7 (999) 123-45-67',
        pattern: '^\\+\\d{1} \\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}$',
    })
    @IsString()
    @IsNotEmpty()
    @Matches(/^\+\d{1} \(\d{3}\) \d{3}-\d{2}-\d{2}$/, {
        message: 'Номер телефона должен соответствовать формату: +x (xxx) xxx-xx-xx',
    })
    readonly phoneNumber: string;

    @ApiProperty({
        description: 'Список ID групп, в которые входит альпинист',
        example: ['dbf2e7e4-9c43-4d2f-bd60-86b02f5056f1', '1f4c7ad3-2492-4f37-b91c-c058aa5a4cb1'],
        type: [String],
        minItems: 1,
    })
    @IsArray()
    @ArrayNotEmpty()
    @IsUUID('4', { each: true })
    readonly groupIds: string[];

    @IsNotEmpty()
    @IsUUID('4')
    readonly userId: string;
}
