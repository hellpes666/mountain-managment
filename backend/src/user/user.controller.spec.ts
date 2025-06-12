import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Role } from '@prisma/__generated__';

describe('UserController', () => {
    let controller: UserController;
    let service: UserService;

    const mockUserService = {
        getAll: jest.fn(),
        updateRole: jest.fn(),
    };

    const mockUser = {
        id: '1',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'hashedPassword',
        role: Role.USER,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: UserService,
                    useValue: mockUserService,
                },
            ],
        }).compile();

        controller = module.get<UserController>(UserController);
        service = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getAllUsers', () => {
        it('should return an array of users', async () => {
            const expectedResult = [mockUser];

            mockUserService.getAll.mockResolvedValue(expectedResult);

            const result = await controller.getAllUsers();
            expect(result).toEqual(expectedResult);
            expect(service.getAll).toHaveBeenCalled();
        });
    });

    describe('updateRole', () => {
        it('should update user role', async () => {
            const id = '1';
            const role = Role.ADMIN;
            const expectedResult = { ...mockUser, role };

            mockUserService.updateRole.mockResolvedValue(expectedResult);

            const result = await controller.updateRole(id, role);
            expect(result).toEqual(expectedResult);
            expect(service.updateRole).toHaveBeenCalledWith(id, role);
        });
    });

    describe('getMe', () => {
        it('should return current user', () => {
            const result = controller.getMe(mockUser);
            expect(result).toEqual(mockUser);
        });
    });
});
