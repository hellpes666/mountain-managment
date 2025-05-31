import { PrismaModule } from './prisma/prisma.module';
import { MountainModule } from './mountain/mountain.module';
import { GroupModule } from './group/group.module';
import { ClimberModule } from './climber/climber.module';
import { EmergencyContactModule } from './emergency_contact/emergency_contact.module';
import { ExportDataModule } from './export-data/export-data.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        PrismaModule,
        MountainModule,
        GroupModule,
        ClimberModule,
        EmergencyContactModule,
        ExportDataModule,
        UserModule,
        AuthModule,
    ],
})
export class AppModule {}
