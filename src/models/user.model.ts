import bycrypt from 'bcrypt';
import mongoose from 'mongoose';

export interface UserInput {
  email: string;
  name: string;
  password: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
  comparePassword(_password: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

schema.pre('save', async function (this: UserDocument, next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bycrypt.genSalt(10);
  const hash = await bycrypt.hashSync(this.password, salt);

  this.password = hash;

  return next();
});

schema.methods.comparePassword = async function (this: UserDocument, password: string) {
  return bycrypt.compare(password, this.password).catch(() => false);
};

const UserModel = mongoose.model<UserDocument>('User', schema);

export default UserModel;
