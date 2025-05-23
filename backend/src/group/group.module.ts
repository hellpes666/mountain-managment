import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { MountainModule } from '@/mountain/mountain.module';

@Module({
    imports: [MountainModule],
    controllers: [GroupController],
    providers: [GroupService],
    exports: [GroupService],
})
export class GroupModule {}
