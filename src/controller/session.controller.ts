import { Request, Response } from 'express';

import { createSession, findSessions, updateSessions } from '../service/session.service';
import { validatePassword } from '../service/user.service';
import { signJWT } from '../utils/jwt.utils';

export async function createUserSessionHandler(req: Request, res: Response) {
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send('Invalid email or password!');
  }

  const session = await createSession(user._id, req.get('user-agent'));
  const token = signJWT({ ...user, session: session._id }, { expiresIn: '15m' });
  const refreshToken = signJWT({}, { expiresIn: '1y' });

  return res.status(200).send({ refreshToken, token });
}

export async function getUserSessionHandler(req: Request, res: Response) {
  const { user } = res.locals;

  const sessions = await findSessions({ user: user._id, valid: true });

  return res.status(200).send(sessions);
}

export async function deleteUserSessionHandler(req: Request, res: Response) {
  const { session } = res.locals.user;

  await updateSessions({ _id: session }, { valid: false });

  return res.status(200).send({
    token: null,
    refreshToken: null,
  });
}
