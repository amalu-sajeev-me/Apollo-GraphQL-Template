import { Query, Resolver } from 'type-graphql';
import { UserSchema } from '../schemas/User..schema';

@Resolver()
export class UserResolver {
    
    @Query(_type => [UserSchema])
    async getAllUsers() {
        return [];
    }
}