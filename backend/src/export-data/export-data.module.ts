import { Module } from '@nestjs/common';
import { ExportDataService } from './export-data.service';
import { ExportDataController } from './export-data.controller';
import { ClimberService } from '@/climber/climber.service';
import { EmergencyContactService } from '@/emergency_contact/emergency_contact.service';
import { GroupService } from '@/group/group.service';
import { MountainService } from '@/mountain/mountain.service';

@Module({
    controllers: [ExportDataController],
    providers: [ExportDataService, ClimberService, GroupService, EmergencyContactService, MountainService],
})
export class ExportDataModule {}
