import { container, injectable, singleton } from 'tsyringe';
import { buildSchema } from 'type-graphql';
import { UserResolver } from '../resolvers/index.ts';
import express, {Application} from 'express';
import { ApolloServer } from 'apollo-server-express';
import { StackError } from '../errors/StackError.ts';
import { IProcessEnv } from './config.ts';
import { MESSAGES } from 'src/constants/messages.ts';
import { Scream } from '../services/Scream.service.ts';
import { Mongo } from './Mongo.ts';

@singleton()
@injectable()
export class Server {
    private server!: ApolloServer;
    private static isInitialized = false;
    private readonly app: Application = express();
    private readonly scream: Scream = container.resolve(Scream);
    private readonly mongo: Mongo = container.resolve(Mongo);

    async initialize() {
        await this.mongo.connect();
        const schema = await buildSchema({
            resolvers: [UserResolver]
        });
        this.server = new ApolloServer({ schema });
        Server.isInitialized = true;
    }

    async start() {
        if (!Server.isInitialized) throw new StackError();
        const { PORT = 4000 } = process.env as IProcessEnv;
        await this.server.start();
        await this.server.applyMiddleware({ app: this.app });
        this.app.listen(PORT, () => {
            this.scream.info(MESSAGES.ServerSart);
        });
    }
}