import { Test, TestingModule } from '@nestjs/testing';
import { ExportDataController } from './export-data.controller';
import { ExportDataService } from './export-data.service';
import { Response } from 'express';
import { ExportDataCategory, ExportOutputType } from './types';

describe('ExportDataController', () => {
    let controller: ExportDataController;
    let service: ExportDataService;

    const mockService = {
        exportData: jest.fn(),
    };

    const mockRes = () => {
        const res: Partial<Response> = {};
        res.status = jest.fn().mockReturnThis();
        res.send = jest.fn().mockReturnThis();
        res.set = jest.fn().mockReturnThis();
        return res as Response;
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ExportDataController],
            providers: [{ provide: ExportDataService, useValue: mockService }],
        }).compile();

        controller = module.get<ExportDataController>(ExportDataController);
        service = module.get<ExportDataService>(ExportDataService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should call exportData on service', async () => {
        const res = mockRes();
        const dataCategory: ExportDataCategory = 'climbers';
        const exportType: ExportOutputType = 'csv';

        mockService.exportData.mockResolvedValueOnce('result');
        const result = await controller.exportData(dataCategory, exportType, res);

        expect(service.exportData).toHaveBeenCalledWith(dataCategory, exportType, res);
        expect(result).toBe('result');
    });
});
