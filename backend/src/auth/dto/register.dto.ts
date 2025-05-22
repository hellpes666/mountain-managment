import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from 'class-validator';

export class RegisterDto {
    @IsEmail({}, { message: 'Введите корректный адрес электронной почты.' })
    @IsNotEmpty({ message: 'Поле email не должно быть пустым.' })
    email: string;

    @IsString({ message: 'Пароль должен быть строкой.' })
    @IsNotEmpty({ message: 'Поле password не должно быть пустым.' })
    @IsStrongPassword(
        {
            minLength: 8,
            minUppercase: 1,
            minLowercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        },
        {
            message:
                'Пароль должен содержать минимум 8 символов, одну заглавную букву, одну строчную букву, одну цифру и один специальный символ.',
        },
    )
    password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    lastName: string;
}
