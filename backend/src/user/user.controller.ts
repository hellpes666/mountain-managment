import { Controller, Get, Param, Patch, Body, UseGuards } from '@nestjs/common';
import { User, Role } from '@prisma/__generated__';
import { UserService } from './user.service';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { Roles, RolesGuard } from '@/common/guards/roles.guard';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @Roles('ADMIN')
    getAllUsers(): Promise<User[]> {
        return this.userService.getAll();
    }

    @Patch(':id/role')
    @Roles('ADMIN')
    updateRole(@Param('id') id: string, @Body('role') role: Role): Promise<User> {
        return this.userService.updateRole(id, role);
    }

    @Get('me')
    getMe(@CurrentUser() user: User) {
        return user;
    }
}
