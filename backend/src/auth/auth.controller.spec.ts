import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response, Request } from 'express';

describe('AuthController', () => {
    let controller: AuthController;
    let service: AuthService;

    const mockService = {
        register: jest.fn(),
        login: jest.fn(),
        checkAuth: jest.fn(),
    };

    const mockRes = () => {
        const res: Partial<Response> = {};
        res.clearCookie = jest.fn();
        res.status = jest.fn().mockReturnThis();
        res.send = jest.fn().mockReturnThis();
        return res as Response;
    };

    const mockReq = () => ({ user: { id: '1' } }) as unknown as Request;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [{ provide: AuthService, useValue: mockService }],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should register user', async () => {
        const dto: RegisterDto = { email: 'test@test.com', password: '123' } as any;
        const res = mockRes();
        mockService.register.mockResolvedValueOnce('registered');
        const result = await controller.register(dto, res);
        expect(service.register).toHaveBeenCalledWith(dto, res);
        expect(result).toBe('registered');
    });

    it('should login user', async () => {
        const dto: LoginDto = { email: 'test@test.com', password: '123' } as any;
        const res = mockRes();
        mockService.login.mockResolvedValueOnce('logged');
        const result = await controller.login(dto, res);
        expect(service.login).toHaveBeenCalledWith(dto, res);
        expect(result).toBe('logged');
    });

    it('should check auth', async () => {
        const req = mockReq();
        mockService.checkAuth.mockResolvedValueOnce('checked');
        const result = await controller.checkAuth(req);
        expect(service.checkAuth).toHaveBeenCalledWith(req);
        expect(result).toBe('checked');
    });

    it('should logout user', async () => {
        const res = mockRes();
        const result = await controller.logout(res);
        expect(res.clearCookie).toHaveBeenCalledWith('access_token');
        expect(result).toEqual({ message: 'Успешный выход' });
    });
});
