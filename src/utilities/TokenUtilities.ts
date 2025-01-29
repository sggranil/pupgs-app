import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import assert from 'assert';

assert(process.env.JWT_SECRET, 'JWT_SECRET is not defined in environment variables');
const JWT_SECRET = process.env.JWT_SECRET;


export function generateToken(payload: object): string {
    return jwt.sign(
        payload, 
        JWT_SECRET as Secret,
        { 
            expiresIn: '1h'
        }
    );
}

export function decodeToken(token: string): JwtPayload | null {
    try {
        return jwt.decode(token) as JwtPayload | null;
    } catch (err) {
        return null;
    }
}

export function verifyToken(token: string): JwtPayload {
    try {
        return jwt.verify(token, JWT_SECRET as Secret) as JwtPayload;
    } catch (err) {
        throw new Error('Invalid or expired token');
    }
}

export function isValidToken(token: string): boolean {
    try {
        verifyToken(token);
        return true;
    } catch {
        return false;
    }
}

