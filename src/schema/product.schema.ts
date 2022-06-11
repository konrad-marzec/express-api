/* eslint-disable camelcase */
import { number, object, string, TypeOf } from 'zod';

export const payload = object({
  body: object({
    title: string({ required_error: 'Title is required!' }).max(80, 'Title must be at most 80 character long!'),
    image: string({ required_error: 'Image is required!' }),
    price: number({ required_error: 'Price is required!' }),
  }),
});

export const params = object({
  params: object({
    productId: string({ required_error: 'productId is required!' }),
  }),
});

export const getProductSchema = params;
export const deleteProductSchema = params;
export const createProductSchema = payload;
export const updateProductSchema = payload.merge(params);

export type GetProductInput = TypeOf<typeof getProductSchema>;
export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
