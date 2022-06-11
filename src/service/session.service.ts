import { FilterQuery, UpdateQuery } from 'mongoose';

import SessionModel, { SessionDocument } from '../models/session.model';
import { signJWT, verifyJWT } from '../utils/jwt.utils';
import { findUser } from './user.service';

export async function createSession(userId: string, userAgent?: string) {
  return (await SessionModel.create({ userId, userAgent })).toJSON();
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
  return SessionModel.find(query).lean();
}

export async function updateSessions(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) {
  return SessionModel.updateOne(query, update);
}

export async function reissueToken(refreshToken: string) {
  const { decoded } = verifyJWT(refreshToken);

  if (!decoded || !decoded.session) {
    return false;
  }

  const session = await SessionModel.findById(decoded.session);

  if (!session || !session.isValid) {
    return false;
  }

  const user = await findUser({ _id: session.user });

  if (!user) {
    return false;
  }

  return signJWT({ ...user, session: session._id }, { expiresIn: '15m' });
}
