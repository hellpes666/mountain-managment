import { Controller } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    
    async findByEmail(email: string) {
        return await this.userService.findByEmail(email)
    } 
}
