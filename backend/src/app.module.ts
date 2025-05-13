import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { MountainModule } from './mountain/mountain.module';

@Module({
    imports: [PrismaModule, MountainModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
