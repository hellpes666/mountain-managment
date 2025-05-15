import { MountainModule } from '../mountain/mountain.module';
import { GroupModule } from '../group/group.module';
import { ClimberModule } from '../climber/climber.module';
import { EmergencyContactModule } from './../emergency_contact/emergency_contact.module';
import { Module } from '@nestjs/common';
import { ExportDataService } from './export-data.service';
import { ExportDataController } from './export-data.controller';

@Module({
    imports: [ClimberModule, EmergencyContactModule, GroupModule, MountainModule],
    controllers: [ExportDataController],
    providers: [ExportDataService],
})
export class ExportDataModule {}
