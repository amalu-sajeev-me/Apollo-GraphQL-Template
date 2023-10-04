import { prop } from '@typegoose/typegoose';
import { IUser } from 'src/zodSchemas/User.zod.ts';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class UserSchema implements IUser{
    @Field(_type => ID)
    id!: string;

    @Field()
    @prop({ required: true })
    username!: string;

    @Field()
    @prop({ required: true })
    email!: string;

    @Field()
    @prop({ required: true })
    password!: string;
}

