import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { EmailNotificationService } from '../email/email.service';
import { UserResolver } from './user.resolver';
import { BlockUserInput } from '../common/graphql/inputs/user/block-user.input';
import { JwtValidatedOutput } from '../common/interfaces/jwt';


describe('UserResolver', () => {
    let resolver: UserResolver;
    let userService: UserService;
    let emailNotificationService: EmailNotificationService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserResolver, UserService, EmailNotificationService],
        }).compile();

        resolver = module.get<UserResolver>(UserResolver);
        userService = module.get<UserService>(UserService);
        emailNotificationService = module.get<EmailNotificationService>(EmailNotificationService);
    });

    describe('blockUser', () => {
        const blockUserInput: BlockUserInput = {
            _id: 'user_id',
        };
        const user: JwtValidatedOutput = {
            userId: 'user_id',
        };
        const blockedUser: User = {
            id: 'user_id',
            email: 'test@example.com',
            isBlocked: true,
        };

        it('should block user and send email notification', async () => {
            jest.spyOn(userService, 'blockUser').mockResolvedValue(blockedUser);
            jest.spyOn(emailNotificationService, 'sendEmailNotification').mockResolvedValue();

            const result = await resolver.blockUser(blockUserInput, { req: { user } });

            expect(userService.blockUser).toHaveBeenCalledWith(blockUserInput);
            expect(emailNotificationService.sendEmailNotification).toHaveBeenCalledWith({
                userEmail: blockedUser.email,
                subject: 'Your access was updated',
                message: 'Your account was blocked',
            });
            expect(result).toEqual(blockedUser);
        });

        it('should throw BadRequestException if trying to block own account', async () => {
            const invalidBlockUserInput: BlockUserInput = {
                _id: 'user_id',
            };
            const invalidUser: JwtValidatedOutput = {
                userId: 'user_id',
            };

            await expect(
                resolver.blockUser(invalidBlockUserInput, { req: { user: invalidUser } })
            ).rejects.toThrow(BadRequestException);
        });
    });
});
