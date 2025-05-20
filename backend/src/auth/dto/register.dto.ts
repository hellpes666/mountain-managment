import { IsEmail, IsString, IsNotEmpty, Length } from 'class-validator';

export class RegisterDto {
    @IsEmail({}, { message: 'Некорректный адрес электронной почты' })
    email: string;

    @IsString({ message: 'Пароль должен быть строкой' })
    @IsNotEmpty({ message: 'Пароль не может быть пустым' })
    @Length(6, 20, { message: 'Пароль должен содержать от 6 до 20 символов' })
    password: string;

    @IsString({ message: 'Имя должно быть строкой' })
    @IsNotEmpty({ message: 'Имя не может быть пустым' })
    firstName: string;

    @IsString({ message: 'Фамилия должна быть строкой' })
    @IsNotEmpty({ message: 'Фамилия не может быть пустой' })
    lastName: string;
}
