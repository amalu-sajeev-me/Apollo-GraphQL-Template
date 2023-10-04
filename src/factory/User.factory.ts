import * as Factory from 'factory.ts';
import { faker } from '@faker-js/faker';
import { IUser } from '../zodSchemas/User.zod.ts';

export const UserFactory = Factory.Sync.makeFactory<IUser>({
    id: Factory.each(() => faker.lorem.slug(1)),
    email: Factory.each(() => faker.internet.email()),
    password: Factory.each(() => faker.internet.password()),
    username: Factory.each(() => faker.internet.userName()),
});
