import z from 'zod';

export class Config {
    private constructor(){}
    public static ENV_SCHEMA = z.object({
        PORT: z.string().min(4),
    });
    protected static validateEnv = (() => {
        try {
            Config.ENV_SCHEMA.parse(process.env);
            console.log('validated env vars');
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
            else {
                console.log('Invalid ENV Variables');
                process.exit(1);
            }

        }
    })();
}
export type IProcessEnv = z.infer<typeof Config.ENV_SCHEMA> & NodeJS.ProcessEnv;