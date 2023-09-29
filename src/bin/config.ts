import { container, injectable } from 'tsyringe';
import z from 'zod';
import { Scream } from '../services/Scream.service';

@injectable()
export class Config {
    private static readonly scream: Scream = container.resolve(Scream);
    public static ENV_SCHEMA = z.object({
        PORT: z.string().min(4),
        MONGO_URL: z.string().nonempty().url(),
        MONGO_DBNAME: z.string().min(3).max(32)
    });
    protected static validateEnv = (() => {
        try {
            Config.ENV_SCHEMA.parse(process.env);
            Config.scream.debug('validated env vars');
        } catch (error) {
            if (error instanceof Error) {
                Config.scream.error(error.message);
            }
            else {
                Config.scream.error('Invalid ENV Variables');
                process.exit(1);
            }

        }
    })();
}
export type IProcessEnv = z.infer<typeof Config.ENV_SCHEMA> & NodeJS.ProcessEnv;