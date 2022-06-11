import { Request, Response } from 'express';

import { CreateUserInput } from '../schema/user.schema';
import { createUser } from '../service/user.service';
import logger from '../utils/loggers';

export async function createUserHandler(req: Request<unknown, unknown, CreateUserInput['body']>, res: Response) {
  try {
    const user = await createUser(req.body);

    return res.status(201).send(user);
  } catch (error) {
    logger.error(error);
    return res.status(400).send('Something went wrong!');
  }
}
