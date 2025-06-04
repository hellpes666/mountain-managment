import { Controller, Get, HttpCode, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ExportDataService } from './export-data.service';
import { ExportDataCategory, ExportOutputType } from './types';

@Controller('export-data')
export class ExportDataController {
    constructor(private readonly exportDataService: ExportDataService) {}

    @Get(':data_category/:export_type')
    @HttpCode(HttpStatus.OK)
    async exportData(
        @Param('data_category') dataCategory: ExportDataCategory,
        @Param('export_type') exportType: ExportOutputType,
        @Res() res: Response,
    ) {
        return await this.exportDataService.exportData(dataCategory, exportType, res);
    }
}
