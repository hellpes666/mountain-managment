import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, Matches, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum Relationship {
    WIFE = 'WIFE',
    HUSBAND = 'HUSBAND',
    BROTHER = 'BROTHER',
    SISTER = 'SISTER',
    MOTHER = 'MOTHER',
    FATHER = 'FATHER',
    GRANDMOTHER = 'GRANDMOTHER',
    GRANDFATHER = 'GRANDFATHER',
    FRIEND = 'FRIEND',
}

export class CreateEmergencyContactDto {
    @ApiProperty({
        example: 'Иван Иванов',
        description: 'Полное имя экстренного контакта (имя и фамилия)',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @Matches(/^[A-Za-zА-Яа-яЁё]+ [A-Za-zА-Яа-яЁё]+$/, {
        message: 'ФИО должно содержать имя и фамилию через пробел',
    })
    readonly fullName: string;

    @ApiPropertyOptional({
        enum: Relationship,
        description: 'Отношение к альпинисту',
    })
    @IsEnum(Relationship)
    @IsOptional()
    readonly relationship?: Relationship;

    @ApiProperty({
        example: '+7 (777) 123-45-67',
        description: 'Телефон экстренного контакта в формате: +x (xxx) xxx-xx-xx',
    })
    @IsString()
    @IsNotEmpty()
    @Matches(/^\+\d{1} \(\d{3}\) \d{3}-\d{2}-\d{2}$/, {
        message: 'Номер телефона должен соответствовать формату: +x (xxx) xxx-xx-xx',
    })
    readonly phoneNumber: string;

    @ApiPropertyOptional({
        example: 'example@mail.com',
        description: 'Email экстренного контакта',
    })
    @IsString()
    @IsOptional()
    @Matches(/^[A-Za-z][A-Za-z0-9._%+-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)
    readonly email?: string;

    @ApiProperty({
        example: 'г. Алматы, ул. Абая, д. 14',
        description: 'Адрес проживания экстренного контакта',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    readonly address: string;

    @ApiProperty({
        example: 'a7d8c94e-fcd4-4ac3-8b90-4173a3e3dd99',
        description: 'UUID альпиниста, к которому относится экстренный контакт',
    })
    @IsUUID('4')
    @IsNotEmpty()
    readonly climberId: string;
}
