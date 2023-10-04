import z from 'zod';

export const UserValidatorSchema = z.object({
    id: z.string().uuid(),
    username: z.string(),
    email: z.string(),
    password: z.string()
});

export type IUser = z.infer<typeof UserValidatorSchema>;