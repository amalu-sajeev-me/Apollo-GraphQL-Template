import mongoose, { Connection } from 'mongoose';
import { container, injectable, singleton } from 'tsyringe';
import { IProcessEnv } from 'src/bin/config.ts';
import { Scream } from '../services/Scream.service.ts';
import { StackError } from '../errors/StackError.ts';

@singleton()
@injectable()
export class Mongo {
    public connection: Connection;
    private readonly scream: Scream = container.resolve(Scream);
    async connect() {
        try {
            const { MONGO_URL, MONGO_DBNAME } = process.env as IProcessEnv;
            const { connection }= await mongoose.connect(MONGO_URL, { dbName: MONGO_DBNAME });
            this.scream.info('mongodb connection succesfull');
            this.connection = connection;
            this.handleErrors();
            return connection;
        } catch (error) {
            this.scream.error('mongodb failed to connect');
            throw error;
        }
    }
    private handleErrors() {
        if (!this.connection) throw new StackError();
        this.connection.on('disconnected', () => {
            this.scream.error('mongodb disconnected');
        });
    }
}