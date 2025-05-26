import { ClerkGuard } from '@/common/guards/clerk.guard';
import { RolesGuard, Roles } from '@/common/guards/roles.guard';
import { Controller, Get, Param, Patch, Body, UseGuards } from '@nestjs/common';
import { User, Role } from '@prisma/__generated__';
import { UserService } from './user.service';
import { CurrentUser } from '@/common/decorators/current-user.decorator';

@Controller('users')
@UseGuards(ClerkGuard, RolesGuard)
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
