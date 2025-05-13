import { IsNotEmpty, IsNumber, IsPositive, IsString, Length, Min } from 'class-validator';

export class CreateMountainDto {
    @IsString()
    @IsNotEmpty()
    @Length(2, 256)
    readonly name: string;

    @IsNumber()
    @IsPositive()
    @Min(200)
    readonly height: number;

    @IsString()
    @IsNotEmpty()
    readonly country: string;

    @IsString()
    @IsNotEmpty()
    readonly region: string;
}
