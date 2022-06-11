/* eslint-disable camelcase */
import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password too short - should be 6 chars minium'),
    passwordConfirmation: string({
      required_error: 'Password confirmation is required',
    }),
  }),

  // .refine((data) => data.password === data.passwordConfirmation, {
  //   message: 'Password does not match',
  //   path: 'passwordConfirmation',
  // }),
});

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, 'passwordConfirmation'>;
