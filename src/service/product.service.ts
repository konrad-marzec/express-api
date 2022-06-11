import { FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';

import ProductModel, { ProductDocument, ProductInput } from '../models/product.model';

export async function createProduct(input: ProductInput) {
  return (await ProductModel.create(input)).toJSON();
}

export async function findProduct(query: FilterQuery<ProductDocument>, options: QueryOptions = { lean: true }) {
  return ProductModel.findOne(query, {}, options);
}

export async function findAndUpdateProduct(
  query: FilterQuery<ProductDocument>,
  update: UpdateQuery<ProductDocument>,
  options: QueryOptions = { lean: true },
) {
  return ProductModel.findOneAndUpdate(query, update, options);
}

export async function deleteProduct(query: FilterQuery<ProductDocument>) {
  return ProductModel.deleteOne(query);
}
