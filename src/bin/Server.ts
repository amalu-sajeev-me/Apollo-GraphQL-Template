import { container, injectable, singleton } from 'tsyringe';
import { buildSchema } from 'type-graphql';
import { UserResolver } from '../resolvers/';
import express, {Application} from 'express';
import { ApolloServer } from 'apollo-server-express';
import { StackError } from '../errors/StackError';
import { IProcessEnv } from './config';
import { MESSAGES } from 'src/constants/messages';
import { Scream } from '../services/Scream.service';

@singleton()
@injectable()
export class Server {
    private server!: ApolloServer;
    private static isInitialized = false;
    private readonly app: Application = express();
    private readonly scream: Scream = container.resolve(Scream);

    async initialize() {
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