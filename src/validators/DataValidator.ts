import { ValidationError } from 'src/errors/ValidationError.ts';
import { ZodError, ZodType, ZodTypeDef } from 'zod';

export class DataValidator <T>{
    constructor(private schema: ZodType<T, ZodTypeDef>) { }
    validate(data: unknown): T {
        //
        try {
            return this.schema.parse(data);
        } catch (error) {
            if (error instanceof ZodError) {
                const validationErrors = error.errors.map(err => ({
                    field: err.path.join('.'),
                    message: err.message,
                }));
                throw new ValidationError(validationErrors);
            }
            throw error;
        }
    }
    
}