import { Test, TestingModule } from '@nestjs/testing';
import { MountainController } from './mountain.controller';
import { MountainService } from './mountain.service';
import { CreateMountainDto } from './dto/create-mountain.dto';


describe('MountainController', () => {
    let controller: MountainController;
    let service: MountainService;

    const mockMountainService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MountainController],
            providers: [
                {
                    provide: MountainService,
                    useValue: mockMountainService,
                },
            ],
        }).compile();

        controller = module.get<MountainController>(MountainController);
        service = module.get<MountainService>(MountainService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create a new mountain', async () => {
            const createDto: CreateMountainDto = {
                name: 'Mount Everest',
                height: 8848,
                country: 'Nepal',
                region: 'Himalayas',
            };
            const expectedResult = { id: '1', ...createDto };

            mockMountainService.create.mockResolvedValue(expectedResult);

            const result = await controller.create(createDto);
            expect(result).toEqual(expectedResult);
            expect(service.create).toHaveBeenCalledWith(createDto);
        });
    });

    describe('findAll', () => {
        it('should return an array of mountains', async () => {
            const expectedResult = [
                {
                    id: '1',
                    name: 'Mount Everest',
                    height: 8848,
                    country: 'Nepal',
                    region: 'Himalayas',
                },
                {
                    id: '2',
                    name: 'K2',
                    height: 8611,
                    country: 'Pakistan',
                    region: 'Karakoram',
                },
            ];

            mockMountainService.findAll.mockResolvedValue(expectedResult);

            const result = await controller.findAll();
            expect(result).toEqual(expectedResult);
            expect(service.findAll).toHaveBeenCalled();
        });
    });

    describe('findOne', () => {
        it('should return a single mountain', async () => {
            const id = '1';
            const expectedResult = {
                id,
                name: 'Mount Everest',
                height: 8848,
                country: 'Nepal',
                region: 'Himalayas',
            };

            mockMountainService.findOne.mockResolvedValue(expectedResult);

            const result = await controller.findOne(id);
            expect(result).toEqual(expectedResult);
            expect(service.findOne).toHaveBeenCalledWith(id);
        });
    });

    describe('remove', () => {
        it('should remove a mountain', async () => {
            const id = '1';
            const expectedResult = 'Mount Everest';

            mockMountainService.remove.mockResolvedValue(expectedResult);

            const result = await controller.remove(id);
            expect(result).toEqual(expectedResult);
            expect(service.remove).toHaveBeenCalledWith(id);
        });
    });
});
