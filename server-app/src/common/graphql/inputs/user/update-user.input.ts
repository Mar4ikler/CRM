import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length, Matches } from 'class-validator';
import { UserRole } from '../../types/user-role.enum';

@InputType()
export class UpdateUserInput {
    @Field(() => String)
    _id: string;

    @Field(() => String)
    @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: 'Email не соответсвует шаблону',
    })
    @IsOptional()
    email?: string;

    @Field(() => String)
    @Length(3, 30, {
        message: 'Имя должно содержать от 3 до 30 символов и может содержать только буквы',
    })
    @IsOptional()
    nickname?: string;

    @Field(() => String)
    @Matches(/^[a-zA-Z0-9_\-!@#$%^&*()\-_+={}[\]:;,<.>]{3,20}$/, {
        message: 'Пароль должен содержать более 3 символов.',
    })
    @IsOptional()
    password?: string;

    @Field(() => UserRole)
    @IsOptional()
    role?: UserRole;
}
