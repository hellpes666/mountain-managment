import { Test, TestingModule } from '@nestjs/testing';
import { ClimberController } from './climber.controller';
import { ClimberService } from './climber.service';
import { CreateClimberDto } from './dto/create-climber.dto';
import { UpdateClimberDto } from './dto/update-climber.dto';

describe('ClimberController', () => {
    let controller: ClimberController;
    let service: ClimberService;

    const mockClimberService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ClimberController],
            providers: [
                {
                    provide: ClimberService,
                    useValue: mockClimberService,
                },
            ],
        }).compile();

        controller = module.get<ClimberController>(ClimberController);
        service = module.get<ClimberService>(ClimberService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create a new climber', async () => {
            const createDto: CreateClimberDto = {
                fullName: 'John Doe',
                address: '123 Main St, City, Country',
                phoneNumber: '+7 (999) 123-45-67',
                userId: '123e4567-e89b-12d3-a456-426614174000',
                groupIds: ['123e4567-e89b-12d3-a456-426614174001'],
            };
            const expectedResult = { id: '1', ...createDto };

            mockClimberService.create.mockResolvedValue(expectedResult);

            const result = await controller.create(createDto);
            expect(result).toEqual(expectedResult);
            expect(service.create).toHaveBeenCalledWith(createDto);
        });
    });

    describe('findAll', () => {
        it('should return an array of climbers', async () => {
            const expectedResult = [
                {
                    id: '1',
                    fullName: 'John Doe',
                    address: '123 Main St, City, Country',
                    phoneNumber: '+7 (999) 123-45-67',
                    userId: '123e4567-e89b-12d3-a456-426614174000',
                    groupIds: ['123e4567-e89b-12d3-a456-426614174001'],
                },
                {
                    id: '2',
                    fullName: 'Jane Doe',
                    address: '456 Oak St, City, Country',
                    phoneNumber: '+7 (999) 987-65-43',
                    userId: '123e4567-e89b-12d3-a456-426614174002',
                    groupIds: ['123e4567-e89b-12d3-a456-426614174003'],
                },
            ];

            mockClimberService.findAll.mockResolvedValue(expectedResult);

            const result = await controller.findAll();
            expect(result).toEqual(expectedResult);
            expect(service.findAll).toHaveBeenCalled();
        });
    });

    describe('findOne', () => {
        it('should return a single climber', async () => {
            const id = '1';
            const expectedResult = {
                id,
                fullName: 'John Doe',
                address: '123 Main St, City, Country',
                phoneNumber: '+7 (999) 123-45-67',
                userId: '123e4567-e89b-12d3-a456-426614174000',
                groupIds: ['123e4567-e89b-12d3-a456-426614174001'],
            };

            mockClimberService.findOne.mockResolvedValue(expectedResult);

            const result = await controller.findOne(id);
            expect(result).toEqual(expectedResult);
            expect(service.findOne).toHaveBeenCalledWith(id);
        });
    });

    describe('update', () => {
        it('should update a climber', async () => {
            const id = '1';
            const updateDto: UpdateClimberDto = {
                fullName: 'John Updated',
                address: '789 New St, City, Country',
            };
            const expectedResult = {
                id,
                ...updateDto,
                phoneNumber: '+7 (999) 123-45-67',
                userId: '123e4567-e89b-12d3-a456-426614174000',
                phone: '+1234567890',
                email: 'john@example.com',
            };

            mockClimberService.update.mockResolvedValue(expectedResult);

            const result = await controller.update(id, updateDto);
            expect(result).toEqual(expectedResult);
            expect(service.update).toHaveBeenCalledWith(id, updateDto);
        });
    });

    describe('remove', () => {
        it('should remove a climber', async () => {
            const id = '1';
            const expectedResult = 'John Doe';

            mockClimberService.remove.mockResolvedValue(expectedResult);

            const result = await controller.remove(id);
            expect(result).toEqual(expectedResult);
            expect(service.remove).toHaveBeenCalledWith(id);
        });
    });
});
