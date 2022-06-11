import config from 'config';
import jwt from 'jsonwebtoken';

const publicKey = config.get<string>('PUBLIC_KEY');
const privateKey = config.get<string>('PRIVATE_KEY');

export function signJWT(payload: Record<string, unknown>, options?: jwt.SignOptions) {
  return jwt.sign(payload, privateKey, { ...(options && options), algorithm: 'RS256' });
}

export function verifyJWT<T = jwt.JwtPayload>(
  token: string,
): { isValid: boolean; isExpired: boolean; decoded: T | null } {
  try {
    return {
      isValid: true,
      isExpired: false,
      decoded: jwt.verify(token, publicKey) as T,
    };
  } catch {
    return {
      decoded: null,
      isValid: false,
      isExpired: true, // 'jwt expired' === '',
    };
  }
}
