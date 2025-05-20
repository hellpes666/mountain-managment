import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Roles } from '@/common/decorators/roles.decorator';
import { Authorization } from './decorators/authorization.decorator';
import { Role } from '@prisma/__generated__';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(dto: RegisterDto) {
        return await this.authService.register(dto);
    }

    @Post('login')
    async login() {
        return 1;
    }

    @Get()
    async checkAuth() {}

    @Get('profile/:id')
    async findById(@Param('id') id: string) {
        return await this.authService.findByIdOrEmail({ id });
    }
}
