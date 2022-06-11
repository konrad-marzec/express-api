import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';

import { UserDocument } from './user.model';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

export interface ProductInput {
  user: UserDocument['_id'];
  description?: string;
  title: string;
  price: number;
  image: string;
}

export interface ProductDocument extends ProductInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const schema = new mongoose.Schema(
  {
    productId: { type: String, required: true, unique: true, default: () => `product_${nanoid()}` },
    price: { type: Number, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String },
  },
  {
    timestamps: true,
  },
);

const ProductModel = mongoose.model<ProductDocument>('Product', schema);

export default ProductModel;
