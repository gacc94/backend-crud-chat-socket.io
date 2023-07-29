import { NextFunction, Response, Request } from 'express';
import { isExpiredAccessToken, verifyAccessToken } from '../utils/helpers/token.helper';
//
export default (request: Request, response: Response, next: NextFunction) => {
    try {
        const { authorization } = request.headers;
        if (!authorization) {
            response.status(401).json({ error: 'Token does´t exist' });
            return;
        }

        const token = authorization.split(' ')[1];

        const decoded = verifyAccessToken(token);
        if (!decoded) {
            response.status(401).json({ error: 'Invalid token' });
            return;
        }

        const decode = isExpiredAccessToken(token);
        if (decode) {
            response.status(403).json({ error: 'Expired token' });
            return;
        }

        next();
    } catch (err) {
        if (err instanceof Error) {
            response.json(err.message).status(404);
            console.log(err.message);
        }
        response.json({ error: 'Server error' }).status(500);
    }
};