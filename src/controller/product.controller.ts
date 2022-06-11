import { Request, Response } from 'express';

import { CreateProductInput, DeleteProductInput, GetProductInput, UpdateProductInput } from '../schema/product.schema';
import { createProduct, deleteProduct, findAndUpdateProduct, findProduct } from '../service/product.service';

export async function createProductHandler(req: Request<unknown, unknown, CreateProductInput['body']>, res: Response) {
  const { _id: userId } = res.locals.user;
  const product = await createProduct({ ...req.body, user: userId as string });

  return res.send(product);
}

export async function getProductHandler(req: Request<GetProductInput['params']>, res: Response) {
  const { productId } = req.params;

  const product = await findProduct({ productId });

  if (!product) {
    return res.sendStatus(404);
  }

  return res.send(product);
}

export async function updateProductHandler(
  req: Request<UpdateProductInput['params'], unknown, UpdateProductInput['body']>,
  res: Response,
) {
  const { _id: userId } = res.locals.user;
  const { productId } = req.params;

  const product = await findProduct({ productId });

  if (!product) {
    return res.sendStatus(404);
  }

  if (product.user !== userId) {
    return res.sendStatus(403);
  }

  const updated = await findAndUpdateProduct({ productId }, req.body, { new: true });
  return res.send(updated);
}

export async function deleteProductHandler(req: Request<DeleteProductInput['params']>, res: Response) {
  const { _id: userId } = res.locals.user;
  const { productId } = req.params;

  const product = await findProduct({ productId });

  if (!product) {
    return res.sendStatus(404);
  }

  if (product.user !== userId) {
    return res.sendStatus(403);
  }

  await deleteProduct({ productId });

  return res.sendStatus(200);
}
