import { Response } from "express";
import { ValidationError } from "sequelize";

const DEFAULT_ERROR_RESPONSE_MSG = 'Internal server error';

export function handleError(e: unknown, res: Response) {
    let msg = '';
    
    if(e instanceof ValidationError) {
        msg = e.errors.map(err => err.message).join(', ');
    } else if(e && typeof e === 'object' && 'message' in e) {
        msg = e.message + '';
    }

    res.status(500).json(msg || DEFAULT_ERROR_RESPONSE_MSG);
}