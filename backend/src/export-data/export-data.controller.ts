import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ExportDataService } from './export-data.service';
import { ExportDataCategory, ExportOutputType } from './types';

@Controller('export-data')
export class ExportDataController {
    constructor(private readonly exportDataService: ExportDataService) {}

    @Get(':data-category/:export-type')
    exportData(
        @Param('data-category') dataCategory: ExportDataCategory,
        @Param('export-type') exportType: ExportOutputType,
        @Res() res: Response,
    ) {}
}
