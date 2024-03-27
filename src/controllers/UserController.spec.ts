import { UserController } from "./UserController";
import { UserService } from '../services/UserService'
import { Request } from 'express'
import { makeMockResponse } from "../__mocks__/mockResponse.mock";

describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn()
    }
    
    const userController = new UserController(mockUserService as UserService);

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Nath',
                email: 'nath@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' })
    })

    it('Deve lançar um erro se o nome do usuário não for fornecido', () => {
        const mockRequest = {
            body: {
                email: 'nath@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        expect(() => userController.createUser(mockRequest, mockResponse)).toThrow('Name is required');
    })

    it('Deve chamar a função getAllUsers', () => {
        const mockRequest = {} as Request
        const mockResponse = makeMockResponse()
        userController.getAllUsers(mockRequest, mockResponse)
        expect(mockUserService.getAllUsers).toHaveBeenCalled();
    })

    it('Deve retornar status 200 e a mensagem correta ao deletar um usuário', () => {
        const userService = new UserService();
        const userController = new UserController(userService);
    
        const mockRequest = {
            body: {
                email: 'joana@dio.com'
            }
        } as Request;
        const mockResponse = makeMockResponse();
    
        userController.deleteUser(mockRequest, mockResponse);
    
        expect(mockResponse.state.status).toBe(200);
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário deletado' });
    });

    it('Deve deletar um usuário', () => {
        const userService = new UserService();
        userService.DeleteUser = jest.fn();
    
        const userController = new UserController(userService);
    
        const mockRequest = {
            body: {
                name: 'joana',
                email: 'joana@dio.com'
            }
        } as Request;
        const mockResponse = makeMockResponse();
    
        userController.deleteUser(mockRequest, mockResponse);
    
        expect(userService.DeleteUser).toHaveBeenCalledWith('joana@dio.com');
    });

    it('Deve lançar um erro se o email do usuário não for fornecido', () => {
        const userService = new UserService();
        const userController = new UserController(userService);
    
        const mockRequest = {
            body: {
                name: 'Joana',
                email: '' // Email em branco
            }
        } as Request;
        const mockResponse = makeMockResponse();
    
        expect(() => userController.createUser(mockRequest, mockResponse)).toThrow('Email is required');
    });
    
    
})
