import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length, Matches } from 'class-validator';

@InputType()
export class UpdateUserInput {
    @Field(() => String)
    _id: string;

    @Field(() => String, { nullable: true })
    @Matches(/^[a-zA-Z0-9_-]{3,16}$/, {
        message:
            'Логин должен содержать от 3 до 16 символов и может содержать только буквы, цифры, символы подчеркивания и дефисы.',
    })
    @IsOptional()
    login?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @Matches(/^[a-zA-Z0-9_\-!@#$%^&*()\-_+={}[\]:;,<.>]{3,}$/, {
        message: 'Пароль должен содержать более 3 символов.',
    })
    @IsOptional()
    password?: string;

    @Field(() => String, { nullable: true })
    @Length(1, 100, {
        message: 'ФИО должно содержать от 1 до 100 символов.',
    })
    @IsOptional()
    fullName?: string;

    @Field(() => String, { nullable: true })
    @Length(1, 100, {
        message: 'Должность должна содержать от 1 до 100 символов.',
    })
    @IsOptional()
    jobPost?: string;

    @Field(() => Boolean, { nullable: true })
    @IsOptional()
    isSuperAdmin?: boolean;
}
