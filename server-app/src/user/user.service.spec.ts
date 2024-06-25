import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { UserService } from './user.service';
import { CryptographyService } from '../cryptography/cryptography.service';
import { CreateUserInput } from './dto/create-user.input';

describe('UserService', () => {
    let userService: UserService;
    let userModel: Model<UserDocument>;
    let cryptographyService: CryptographyService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getModelToken(User.name),
                    useValue: {
                        findOne: jest.fn(),
                        create: jest.fn(),
                    },
                },
                {
                    provide: CryptographyService,
                    useValue: {
                        encryptPassword: jest.fn(),
                    },
                },
            ],
        }).compile();

        userService = module.get<UserService>(UserService);
        userModel = module.get<Model<UserDocument>>(getModelToken(User.name));
        cryptographyService = module.get<CryptographyService>(CryptographyService);
    });

    describe('createUser', () => {
        it('should create a new user successfully', async () => {
            const createUserInput: CreateUserInput = {
                nickname: 'testuser',
                email: 'test@example.com',
                password: 'password123',
                role: 'user',
            };

            jest.spyOn(userModel, 'findOne').mockResolvedValue(null);
            jest.spyOn(cryptographyService, 'encryptPassword').mockResolvedValue('hashedPassword');
            jest.spyOn(userModel, 'create').mockResolvedValue({
                _id: '1',
                nickname: 'testuser',
                email: 'test@example.com',
                passwordHash: 'hashedPassword',
                isDeleted: false,
                isBlocked: false,
                role: 'user',
                avatar: '',
            });

            const user = await userService.createUser(createUserInput);

            expect(userModel.findOne).toHaveBeenCalledWith({
                nickname: 'testuser',
                isDeleted: false,
            });
            expect(cryptographyService.encryptPassword).toHaveBeenCalledWith('password123');
            expect(userModel.create).toHaveBeenCalledWith({
                nickname: 'testuser',
                email: 'test@example.com',
                passwordHash: 'hashedPassword',
                isDeleted: false,
                isBlocked: false,
                role: 'user',
                avatar: '',
            });
            expect(user).toEqual({
                _id: '1',
                nickname: 'testuser',
                email: 'test@example.com',
                passwordHash: 'hashedPassword',
                isDeleted: false,
                isBlocked: false,
                role: 'user',
                avatar: '',
            });
        });

        it('should throw a BadRequestException if the user already exists', async () => {
            const createUserInput: CreateUserInput = {
                nickname: 'testuser',
                email: 'test@example.com',
                password: 'password123',
                role: 'user',
            };

            jest.spyOn(userModel, 'findOne').mockResolvedValue({
                _id: '1',
                nickname: 'testuser',
                email: 'test@example.com',
                passwordHash: 'hashedPassword',
                isDeleted: false,
                isBlocked: false,
                role: 'user',
                avatar: '',
            });

            await expect(userService.createUser(createUserInput)).rejects.toThrow(
                BadRequestException
            );
            expect(userModel.findOne).toHaveBeenCalledWith({
                nickname: 'testuser',
                isDeleted: false,
            });
        });

        it('should throw a BadRequestException if there is an error creating the user', async () => {
            const createUserInput: CreateUserInput = {
                nickname: 'testuser',
                email: 'test@example.com',
                password: 'password123',
                role: 'user',
            };

            jest.spyOn(userModel, 'findOne').mockResolvedValue(null);
            jest.spyOn(cryptographyService, 'encryptPassword').mockResolvedValue('hashedPassword');
            jest.spyOn(userModel, 'create').mockRejectedValue(new Error('Database error'));

            await expect(userService.createUser(createUserInput)).rejects.toThrow(
                BadRequestException
            );
            expect(userModel.findOne).toHaveBeenCalledWith({
                nickname: 'testuser',
                isDeleted: false,
            });
            expect(cryptographyService.encryptPassword).toHaveBeenCalledWith('password123');
            expect(userModel.create).toHaveBeenCalledWith({
                nickname: 'testuser',
                email: 'test@example.com',
                passwordHash: 'hashedPassword',
                isDeleted: false,
                isBlocked: false,
                role: 'user',
                avatar: '',
            });
        });
    });
});
