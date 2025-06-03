import { Controller, Post, Body, Res, Req, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { type Request, type Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @ApiOperation({ summary: 'Регистрация нового пользователя' })
    @ApiResponse({ status: 201, description: 'Пользователь успешно зарегистрирован' })
    @ApiResponse({ status: 400, description: 'Некорректные данные' })
    @ApiBody({ type: RegisterDto })
    async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response) {
        return await this.authService.register(dto, res);
    }

    @Post('login')
    @ApiOperation({ summary: 'Вход пользователя' })
    @ApiResponse({ status: 200, description: 'Успешный вход' })
    @ApiResponse({ status: 401, description: 'Неверные учетные данные' })
    @ApiBody({ type: LoginDto })
    async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
        return await this.authService.login(dto, res);
    }

    @Get('')
    @ApiOperation({ summary: 'Проверка статуса аутентификации пользователя' })
    @ApiResponse({ status: 200, description: 'Пользователь аутентифицирован' })
    @ApiResponse({ status: 401, description: 'Пользователь не аутентифицирован' })
    async checkAuth(@Req() req: Request) {
        return this.authService.checkAuth(req);
    }

    @Get('logout')
    @ApiOperation({
        summary: 'Завершение сессии пользователя',
        description: 'Выход пользователя из системы и завершение его сессии.',
    })
    @ApiResponse({ status: 200, description: 'Успешный выход из системы' })
    @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
    async logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('access_token');
        return { message: 'Успешный выход' };
    }
}
