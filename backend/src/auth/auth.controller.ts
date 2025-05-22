import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { type Response, type Request } from 'express';
import {
    ApiBadRequestResponse,
    ApiConflictResponse,
    ApiNotFoundResponse,
    ApiOperation,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({
        summary: 'Создание аккаунта',
        description: 'Создаёт новый аккаунт пользователя',
    })
    @ApiConflictResponse({
        description: 'Пользователь с такой почтой уже существует',
    })
    @ApiBadRequestResponse({
        description: 'Некорректные входные данные',
    })
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Res({ passthrough: true }) res: Response, @Body() dto: RegisterDto) {
        return await this.authService.register(res, dto);
    }

    @ApiOperation({
        summary: 'Вход в аккаунт',
        description: 'Входит в аккаунт и выдает токен доступа',
    })
    @ApiBadRequestResponse({
        description: 'Некорректные входные данные',
    })
    @ApiNotFoundResponse({
        description: 'Пользователь не найден',
    })
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Res({ passthrough: true }) res: Response, @Body() dto: LoginDto) {
        return await this.authService.login(res, dto);
    }

    @ApiOperation({
        summary: 'Обновление токена доступа',
        description: 'Генерирует новый токен доступа',
    })
    @ApiUnauthorizedResponse({
        description: 'Недействительныйы refresh-токен',
    })
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        return await this.authService.refresh(req, res);
    }

    @ApiOperation({
        summary: 'Выход из аккаунта',
    })
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logout(@Res({ passthrough: true }) res: Response) {
        return await this.authService.logout(res);
    }
}
