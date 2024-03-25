import { Field, InputType } from '@nestjs/graphql';
import { Length, Matches } from 'class-validator';

@InputType()
export class CreateUserInput {
    @Field(() => String)
    @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: 'Email не соответсвует шаблону',
    })
    email: string;

    @Field(() => String)
    @Length(3, 30, {
        message: 'Имя должно содержать от 3 до 30 символов и может содержать только буквы',
    })
    name: string;

    @Field(() => String)
    @Length(3, 30, {
        message: 'Фамилия должна содержать от 3 до 30 символов и может содержать только буквы',
    })
    surname: string;

    @Field(() => String)
    @Matches(/^[a-zA-Z0-9_\-!@#$%^&*()\-_+={}[\]:;,<.>]{3,20}$/, {
        message: 'Пароль должен содержать более 3 символов.',
    })
    password: string;

    @Field(() => String)
    @Matches(/^\+375\s\d{2}\s\d{7}$/, {
        message: 'Мобильный телефон не соответсвует шаблону',
    })
    phoneNumber: string;

    @Field(() => Boolean)
    isAdmin: boolean;
}
