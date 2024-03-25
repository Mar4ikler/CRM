import { Field, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';
import { MediaObjectInput } from '../media-object.input';

@InputType()
export class CreateExerciseInput {
    @Field(() => String)
    @Length(3, 30, {
        message: 'Имя должно содержать от 3 до 30 символов и может содержать только буквы',
    })
    name: string;

    @Field(() => Number)
    // @Length(3, 30, {
    //     message: 'Фамилия должна содержать от 3 до 30 символов и может содержать только буквы',
    // })
    difficaulty: number;
    @Field(() => String)
    @Length(3, 30, {
        message: 'Описание должно содержать от 3 до 30 символов и может содержать только буквы',
    })
    description: string;
    @Field(() => [MediaObjectInput])
    images: MediaObjectInput[];
    @Field(() => [MediaObjectInput])
    videos: MediaObjectInput[];
}
