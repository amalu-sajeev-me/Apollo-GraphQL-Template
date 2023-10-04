import { Query, Resolver } from 'type-graphql';
import { UserSchema } from '../schemas/User..schema.ts';
import { UserFactory } from '../factory/User.factory.ts';

@Resolver()
export class UserResolver {
    
    @Query(_type => [UserSchema])
    async getAllUsers() {
        return UserFactory.buildList(5);
    }
}