import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { MountainModule } from 'src/mountain/mountain.module';

@Module({
    imports: [MountainModule],
    controllers: [GroupController],
    providers: [GroupService],
})
export class GroupModule {}
