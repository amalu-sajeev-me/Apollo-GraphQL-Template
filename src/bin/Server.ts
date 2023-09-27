import { injectable, singleton } from 'tsyringe';
import { buildSchema } from 'type-graphql';
import { UserResolver } from '../resolvers/';
import express, {Express} from 'express';
import { ApolloServer } from 'apollo-server-express';
import { StackError } from '../errors/StackError';

@singleton()
@injectable()
export class Server {
    private server!: ApolloServer;
    private static isInitialized = false;
    app!: Express;

    async initialize() {
        const schema = await buildSchema({
            resolvers: [UserResolver]
        });
        this.app = express();
        this.server = new ApolloServer({ schema });
        Server.isInitialized = true;
    }

    async start() {
        if (!Server.isInitialized) throw new StackError();
        await this.server.start();
        await this.server.applyMiddleware({ app: this.app });
    }
}