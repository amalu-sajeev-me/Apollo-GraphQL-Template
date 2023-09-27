import { prop } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class UserSchema {
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

