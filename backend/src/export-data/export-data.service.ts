import { Injectable, Res } from '@nestjs/common';
import { Response } from 'express';
import { write as csvWrite } from 'fast-csv';
import { Writable } from 'stream';
import * as ExcelJS from 'exceljs';
import { ExportDataCategory, ExportOutputType, ServicesType } from './types';
import { ClimberService } from '@/climber/climber.service';
import { EmergencyContactService } from '@/emergency_contact/emergency_contact.service';
import { GroupService } from '@/group/group.service';
import { MountainService } from '@/mountain/mountain.service';

@Injectable()
export class ExportDataService {
    private linkedParamNameAndService: { [key in ExportDataCategory]: ServicesType } = {
        climbers: 'climberService',
        'emergency-contacts': 'emergencyContactService',
        groups: 'groupService',
        mountains: 'mountainService',
    };

    constructor(
        private readonly climberService: ClimberService,
        private readonly emergencyContactService: EmergencyContactService,
        private readonly groupService: GroupService,
        private readonly mountainService: MountainService,
    ) {}

    async exportData(
        dataCategory: ExportDataCategory,
        exportType: ExportOutputType,
        @Res({ passthrough: true }) res: Response,
    ) {
        switch (exportType) {
            case 'csv':
                await this.exportCsvFile(dataCategory, res);
                break;
            case 'excel':
                await this.exportExcelFile(dataCategory, res);
                break;
            default:
                throw new Error('Неизвестный тип экспорта');
        }
    }
    private async exportCsvFile(dataCategory: ExportDataCategory, @Res() res: Response) {
        const service = this.linkedParamNameAndService[dataCategory];
        const data = await this[service].findAll();

        const flattenItems = data.map((item) => this.flattenObject(item));

        this.setHeader(dataCategory, 'csv', res);

        const outputStream = this.createStreamToExportCSV(res);

        csvWrite(flattenItems, { headers: true }).pipe(outputStream);
    }

    private async exportExcelFile(dataCategory: ExportDataCategory, @Res() res: Response) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet(dataCategory);

        const service = this.linkedParamNameAndService[dataCategory];
        const data = await this[service].findAll();

        if (data.length > 0) {
            const headers = Object.keys(this.flattenObject(data[0]));
            worksheet.addRow(headers);
        }

        data.forEach((item) => {
            const flatItem = this.flattenObject(item);
            worksheet.addRow(Object.values(flatItem));
        });

        this.setHeader(dataCategory, 'excel', res);
        await workbook.xlsx.write(res);
    }

    private createStreamToExportCSV(@Res() res: Response) {
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

    private setHeader(dataCategory: ExportDataCategory, exportType: ExportOutputType, @Res() res: Response) {
        switch (exportType) {
            case 'csv':
                res.header('Content-Type', 'text/csv; charset=utf-8');
                res.header('Content-Disposition', `attachment; filename=${dataCategory}.csv`);

                break;
            case 'excel':
                res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                res.header('Content-Disposition', `attachment; filename=${dataCategory}.xlsx`);
                break;
        }
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
}
