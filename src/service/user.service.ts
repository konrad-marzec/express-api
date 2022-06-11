import mongoose, { FilterQuery } from 'mongoose';

import UserModel, { UserDocument, UserInput } from '../models/user.model';

export async function createUser(input: mongoose.DocumentDefinition<UserInput>) {
  return UserModel.create(input);
}

export async function validatePassword({ email, password }: { email: string; password: string }) {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return null;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    return null;
  }

  return user;
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query).lean();
}
