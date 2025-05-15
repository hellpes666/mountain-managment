import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, Matches, MinLength } from 'class-validator';

enum Relationship {
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
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @Matches(/^[A-Za-zА-Яа-яЁё]+ [A-Za-zА-Яа-яЁё]+$/)
    readonly fullName: string;

    @IsEnum(Relationship)
    @IsOptional()
    readonly relationship?: Relationship;

    @IsString()
    @IsNotEmpty()
    @Matches(/^\+\d{1} \(\d{3}\) \d{3}-\d{2}-\d{2}$/, {
        message: 'Номер телефона должен соответствовать формату: +x (xxx) xxx-xx-xx',
    })
    readonly phoneNumber: string;

    @IsString()
    @IsOptional()
    @Matches(/^[A-Za-z][A-Za-z0-9._%+-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)
    readonly email?: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    readonly address: string;

    @IsUUID('4')
    @IsNotEmpty()
    readonly climberId: string;
}
