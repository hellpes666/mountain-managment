import { IsNotEmpty, IsString, Length, Matches, IsUUID, ArrayNotEmpty, IsArray } from 'class-validator';

export class CreateClimberDto {
    @IsString()
    @IsNotEmpty()
    @Length(2, 256)
    readonly fullName: string;

    @IsString()
    @IsNotEmpty()
    @Length(10, 256)
    readonly address: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^\+\d{1} \(\d{3}\) \d{3}-\d{2}-\d{2}$/, {
        message: 'Номер телефона должен соответствовать формату: +x (xxx) xxx-xx-xx',
    })
    readonly phoneNumber: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsUUID('4', { each: true })
    readonly groupIds: string[];
}
