import { Test, TestingModule } from '@nestjs/testing';
import { EmergencyContactController } from './emergency_contact.controller';
import { EmergencyContactService } from './emergency_contact.service';
import { CreateEmergencyContactDto } from './dto/create-emergency_contact.dto';
import { UpdateEmergencyContactDto } from './dto/update-emergency_contact.dto';

describe('EmergencyContactController', () => {
    let controller: EmergencyContactController;
    let service: EmergencyContactService;

    const mockService = {
        create: jest.fn((dto) => ({ id: '1', ...dto })),
        findAll: jest.fn(() => [{ id: '1', name: 'Test', phone: '123' }]),
        findOne: jest.fn((id) => ({ id, name: 'Test', phone: '123' })),
        update: jest.fn((id, dto) => ({ id, ...dto })),
        remove: jest.fn((id) => ({ id, phone: '123' })),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [EmergencyContactController],
            providers: [{ provide: EmergencyContactService, useValue: mockService }],
        }).compile();

        controller = module.get<EmergencyContactController>(EmergencyContactController);
        service = module.get<EmergencyContactService>(EmergencyContactService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should create emergency contact', () => {
        const dto: CreateEmergencyContactDto = { name: 'Test', phone: '123' } as any;
        expect(controller.create(dto)).toEqual({ id: '1', ...dto });
        expect(service.create).toHaveBeenCalledWith(dto);
    });

    it('should return all emergency contacts', () => {
        expect(controller.findAll()).toEqual([{ id: '1', name: 'Test', phone: '123' }]);
        expect(service.findAll).toHaveBeenCalled();
    });

    it('should return one emergency contact', () => {
        expect(controller.findOne('1')).toEqual({ id: '1', name: 'Test', phone: '123' });
        expect(service.findOne).toHaveBeenCalledWith('1');
    });

    it('should update emergency contact', () => {
        const dto: UpdateEmergencyContactDto = { name: 'Updated', phone: '456' } as any;
        expect(controller.update('1', dto)).toEqual({ id: '1', ...dto });
        expect(service.update).toHaveBeenCalledWith('1', dto);
    });

    it('should remove emergency contact', () => {
        expect(controller.remove('1')).toEqual({ id: '1', phone: '123' });
        expect(service.remove).toHaveBeenCalledWith('1');
    });
});
