/* eslint-disable camelcase */
import { object, string, TypeOf } from 'zod';

export const createSessionSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required!',
    }).email(),
    password: string({ required_error: 'Password is required!' }),
  }),
});

export type CreateSessionInput = Omit<TypeOf<typeof createSessionSchema>, 'passwordConfirmation'>;
