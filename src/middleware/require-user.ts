import { NextFunction, Request, Response } from 'express';

function requireUser(_: Request, res: Response, next: NextFunction) {
  const user = res.locals.User;

  if (!user) {
    return res.sendStatus(403);
  }

  return next();
}

export default requireUser;
