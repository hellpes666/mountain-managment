import { Roles } from '@/common/decorators/roles.decorator';
import { AuthGuard } from '@/common/guards/auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/__generated__';

/**
 * Декоратор для авторизации пользователей на основе их ролей.
 *
 * Если указаны роли, применяется декоратор `Roles` и используются guard'ы `AuthGuard` и `RolesGuard`.
 * Если роли не указаны, применяется только guard `AuthGuard`.
 *
 * @param {...Role[]} roles - Список ролей, которым разрешён доступ к ресурсу.
 * @returns {MethodDecorator & ClassDecorator} Декоратор для методов или классов контроллера.
 */
export function Authorization(...roles: Role[]) {
	if (roles.length > 0) {
		return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RolesGuard));
	}

	return applyDecorators(UseGuards(AuthGuard));
}