import { MountainService } from '../mountain/mountain.service';
import { GroupService } from '../group/group.service';
import { EmergencyContactService } from '../emergency_contact/emergency_contact.service';
import { ClimberService } from '../climber/climber.service';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable, Res } from '@nestjs/common';
import { Response } from 'express';
import { write as csvWrite } from 'fast-csv';
import { Writable } from 'stream';
import * as ExcelJS from 'exceljs';
import { ExportDataCategory, ExportOutputType, ServicesType } from './types';

@Injectable()
export class ExportDataService {
    private linkedParamNameAndService: { [key in ExportDataCategory]: ServicesType } = {
        climbers: 'climberService',
        'emergency-contacts': 'emergencyContactService',
        groups: 'groupService',
        mountains: 'mountainService',
    };

    constructor(
        private readonly prismaService: PrismaService,
        private readonly climberService: ClimberService,
        private readonly emergencyContactService: EmergencyContactService,
        private readonly groupService: GroupService,
        private readonly mountainService: MountainService,
    ) {}

    private setHeaderAndCreateStream(@Res() res: Response) {
        res.header('Content-Type', 'text/csv; charset=utf-8');
        res.header('Content-Disposition', 'attachment; filename=climbers.csv');
        res.write('\uFEFF');
        const stream = new Writable({
            write(chunk, encoding, callback) {
                res.write(chunk, callback);
            },
            final() {
                res.end();
            },
        });

        return stream;
    }

    private flattenObject(obj: any, prefix = '', result: any = {}): any {
        for (const key of Object.keys(obj)) {
            const value = obj[key];
            const prefixedKey = prefix ? `${prefix}.${key}` : key;

            if (Array.isArray(value)) {
                result[prefixedKey] = JSON.stringify(value);
            } else if (value !== null && typeof value === 'object') {
                this.flattenObject(value, prefixedKey, result);
            } else {
                result[prefixedKey] = value;
            }
        }
        return result;
	}
	
	 private exportCsvFile() {
		return 1
	}
    private exportExcelFile() {
		return 1
	}

    // const stream = this.setHeaderAndCreateStream(res);

    // csvWrite(flatClimbers, { headers: true }).pipe(stream);

    async exportData(dataCategory: ExportDataCategory, exportType: ExportOutputType, @Res() res: Response) {
        const serviceName = this.linkedParamNameAndService[dataCategory];
        const items = await this[serviceName].findAll();
		const flattenItems = items.map((item) => this.flattenObject(item));
		
        switch (exportType) {
            case 'csv':
                this.exportCsvFile();
                break;
            case 'excel':
                this.exportExcelFile();
                break;
            default:
                throw new Error('Неизвестный тип экспорта');
        }
    }

   
}
