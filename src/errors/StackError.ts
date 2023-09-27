import { ERROR_TYPE } from './types';

export class StackError extends Error{
    public errorType = ERROR_TYPE.STACK;
    constructor() {
        super(ERROR_TYPE.STACK);
    }
}