import { Field, InputType } from '@nestjs/graphql';
import { Length, Matches } from 'class-validator';

@InputType()
export class RegisterUserInput {
    @Field(() => String)
    @Matches(/^([a-z0-9_\\.-]+)@(([^\bbk]+)([\da-z\\.-]+))\.(com|gmail|ru)$/i, {
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
    @Matches(/^\+(?:\d){1,3}(?:\d|\s|\(|\)){7,17}\d$/, {
        message: 'Мобильный телефон не соответсвует шаблону',
    })
    phoneNumber: string;
}
