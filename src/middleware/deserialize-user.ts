import { NextFunction, Request, Response } from 'express';

import { reissueToken } from '../service/session.service';
import { verifyJWT } from '../utils/jwt.utils';

async function deserializeUser(req: Request, res: Response, next: NextFunction) {
  const authHeader = (req.headers.Authorization as string) || '';

  const [, token] = authHeader.split(' ');

  if (!token) {
    return next();
  }

  const refreshToken = req.headers['x-refresh'] as string;
  const { decoded, isExpired } = verifyJWT(token);

  if (decoded) {
    res.locals.user = decoded;
  }

  if (isExpired && refreshToken) {
    const newToken = await reissueToken(refreshToken);

    if (newToken) {
      res.setHeader('x-access-token', newToken);

      const result = verifyJWT(newToken);

      res.locals.user = result.decoded;
      return next();
    }
  }

  return next();
}

export default deserializeUser;
