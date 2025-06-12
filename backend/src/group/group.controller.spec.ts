import { Test, TestingModule } from '@nestjs/testing';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { FindByDateDto } from './dto/find-by-date.dto';
import { PrismaService } from '@/prisma/prisma.service';

describe('GroupController', () => {
    let controller: GroupController;
    let service: GroupService;

    const mockGroupService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    };

    const mockPrismaService = {
        group: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [GroupController],
            providers: [
                {
                    provide: GroupService,
                    useValue: mockGroupService,
                },
                {
                    provide: PrismaService,
                    useValue: mockPrismaService,
                },
            ],
        }).compile();

        controller = module.get<GroupController>(GroupController);
        service = module.get<GroupService>(GroupService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create a new group', async () => {
            const createDto: CreateGroupDto = {
                name: 'Test Group',
                startDate: '2024-03-20',
                endDate: '2024-03-25',
                mountainId: '1',
            };
            const expectedResult = { id: '1', ...createDto };

            mockGroupService.create.mockResolvedValue(expectedResult);

            const result = await controller.create(createDto);
            expect(result).toEqual(expectedResult);
            expect(service.create).toHaveBeenCalledWith(createDto);
        });
    });

    describe('findAll', () => {
        it('should return an array of groups', async () => {
            const params: FindByDateDto = { startDate: '2024-03-20', endDate: '2024-03-25' };
            const expectedResult = [
                { id: '1', name: 'Group 1', startDate: '2024-03-20', endDate: '2024-03-25', mountainId: '1' },
                { id: '2', name: 'Group 2', startDate: '2024-03-20', endDate: '2024-03-25', mountainId: '2' },
            ];

            mockGroupService.findAll.mockResolvedValue(expectedResult);

            const result = await controller.findAll(params);
            expect(result).toEqual(expectedResult);
            expect(service.findAll).toHaveBeenCalledWith(params);
        });
    });

    describe('findOne', () => {
        it('should return a single group', async () => {
            const id = '1';
            const expectedResult = {
                id,
                name: 'Test Group',
                startDate: '2024-03-20',
                endDate: '2024-03-25',
                mountainId: '1',
            };

            mockGroupService.findOne.mockResolvedValue(expectedResult);

            const result = await controller.findOne(id);
            expect(result).toEqual(expectedResult);
            expect(service.findOne).toHaveBeenCalledWith(id);
        });
    });
});
