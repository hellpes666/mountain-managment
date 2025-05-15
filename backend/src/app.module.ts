import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { MountainModule } from './mountain/mountain.module';
import { GroupModule } from './group/group.module';
import { ClimberModule } from './climber/climber.module';
import { EmergencyContactModule } from './emergency_contact/emergency_contact.module';

@Module({
    imports: [PrismaModule, MountainModule, GroupModule, ClimberModule, EmergencyContactModule],
})
export class AppModule {}
