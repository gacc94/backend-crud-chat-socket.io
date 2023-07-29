import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/config';

const ACCESS_TOKEN_SECRET = config.get('auth.access_token'); // Reemplaza con tu secreto para el accessToken JWT
const REFRESH_TOKEN_SECRET = config.get('auth.refresh_token'); // Reemplaza con tu secreto para el refreshToken JWT
const ACCESS_TOKEN_EXPIRATION = config.get('auth.exp_access'); // Tiempo de expiración del accessToken (1 hora)
const REFRESH_TOKEN_EXPIRATION = config.get('auth.exp_refresh'); // Tiempo de expiración del refreshToken (7 días)

export const generateAccessToken = (payload: any): string => jwt.sign(payload, ACCESS_TOKEN_SECRET, {
	expiresIn: ACCESS_TOKEN_EXPIRATION,
	algorithm: 'HS256',
});

export const generateRefreshToken = (payload: any): string => jwt.sign(payload, REFRESH_TOKEN_SECRET, {
	expiresIn: REFRESH_TOKEN_EXPIRATION,
	algorithm: 'HS256',
});

export const verifyAccessToken = (token: string): any => {
	try {
		return jwt.verify(token, ACCESS_TOKEN_SECRET);
	} catch (error) {
		return null; // Si ocurre un error en la verificación del token, devolvemos null
	}

};

export const verifyRefreshToken = (token: string): any => {
	try {
		return jwt.verify(token, REFRESH_TOKEN_SECRET);
	} catch (error) {
		return null; // Si ocurre un error en la verificación del token, devolvemos null
	}
};

export const getExpiredToken = (token: string) => {
	const decoded = jwt.decode(token, { complete: true });
	if (!decoded) return null;

	// const expiration = new Date(decoded.payload.exp * 1000);
	// return expiration;
};