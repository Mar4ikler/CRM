import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserRole } from 'src/common/graphql/types/user-role.enum';

@Schema({ collection: 'usersStore', versionKey: false })
@ObjectType()
export class User {
    @Field(() => String)
    _id: string;
    @Prop({ required: true })
    @Field(() => String)
    name: string;
    @Prop({ required: true })
    @Field(() => String)
    surname: string;
    @Prop({ required: true })
    @Field(() => String)
    phoneNumber: string;
    @Prop({ required: true})
    @Field(() => String)
    email: string;
    @Prop({ required: true })
    @Field(() => String)
    passwordHash: string;
    @Prop()
    @Field(() => String, { nullable: true })
    avatar: string;
    @Prop({ required: true, type: String, enum: UserRole })
    @Field(() => UserRole)
    role: UserRole;
    @Prop()
    @Field(() => Boolean)
    isBlocked: false;
    @Prop()
    @Field(() => Boolean)
    isDeleted: false;
    @Prop()
    @Field(() => [String])
    favorites: string[];
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
