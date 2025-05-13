import { Module } from '@nestjs/common';
import { MountainService } from './mountain.service';
import { MountainController } from './mountain.controller';

@Module({
    controllers: [MountainController],
	providers: [MountainService],
	exports: [MountainService]
})
export class MountainModule {}
