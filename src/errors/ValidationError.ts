export class ValidationError extends Error{
    constructor(public errors: { field: string; message: string }[]) {
        super('ValidationError');
    }
}