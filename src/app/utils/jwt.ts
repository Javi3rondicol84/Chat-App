import jwt, { Jwt } from 'jsonwebtoken';

const SECRET_KEY: string = 'accesskeyexample';

export interface JwtPayload {
    name: string;
}

export const generateToken = (payload: JwtPayload, expiresIn: string | number = '3h'): string => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

export const verifyToken = (token: string): JwtPayload => {
    try {
        return jwt.verify(token, SECRET_KEY) as JwtPayload;
    }
    catch (error) {
        throw new Error('Invalid or expired token');
    }
}


export const storeToken = (token: string): void => {
    localStorage.setItem('token', token);
};

export const getToken = (): string | null => {
    return localStorage.getItem('token');
};

