import jwt, { Jwt } from 'jsonwebtoken';

const SECRET_KEY: string = 'accesskeyexample';

export interface JwtPayload {
    name: string;
    exp: number;
}

export const generateToken = (payload: { name: string }): string => {
    const token = jwt.sign(
        { 
            name: payload.name,
            exp: Math.floor(Date.now() / 1000) + (60 * 60) // Add expiration time (1 hour)
        },
        SECRET_KEY
    );

    return token;
};

export const verifyToken = (token: string): JwtPayload => {
    try {
        return jwt.verify(token, SECRET_KEY) as JwtPayload;
    }
    catch (error) {
        localStorage.removeItem('token');
        throw new Error('Invalid or expired token');
    }
}


export const storeToken = (token: string): void => {
    localStorage.setItem('token', token);
};

export const getToken = (): string | null => {
    return localStorage.getItem('token');
};

