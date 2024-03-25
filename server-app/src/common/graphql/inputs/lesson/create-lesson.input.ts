import { Field, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';
import { MediaObjectInput } from '../media-object.input';

@InputType()
export class CreateLessonInput {
    @Field(() => String)
    @Length(3, 30, {
        message: 'Имя должно содержать от 3 до 30 символов и может содержать только буквы',
    })
    name: string;
    @Field(() => String)
    @Length(3, 30, {
        message: 'Описание должно содержать от 3 до 30 символов и может содержать только буквы',
    })
    description: string;
    @Field(() => [MediaObjectInput])
    images: MediaObjectInput[];
}
