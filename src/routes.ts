import { Express } from 'express';

import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  updateProductHandler,
} from './controller/product.controller';
import {
  createUserSessionHandler,
  deleteUserSessionHandler,
  getUserSessionHandler,
} from './controller/session.controller';
import { createUserHandler } from './controller/user.controller';
import requireUser from './middleware/require-user';
import validate from './middleware/resource-validator';
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from './schema/product.schema';
import { createSessionSchema } from './schema/session.schema';
import { createUserSchema } from './schema/user.schema';

function routes(app: Express) {
  app.get('/health-check', (_, res) => res.sendStatus(200));

  app.post('/api/users', validate(createUserSchema), createUserHandler);

  app.post('/api/sessions', validate(createSessionSchema), createUserSessionHandler);
  app.delete('/api/sessions', requireUser, deleteUserSessionHandler);
  app.get('/api/sessions', requireUser, getUserSessionHandler);

  app.get('/api/products/:productId', validate(getProductSchema), getProductHandler);
  app.post('/api/products', [validate(createProductSchema), requireUser], createProductHandler);
  app.put('/api/products/:productId', [validate(updateProductSchema), requireUser], updateProductHandler);
  app.delete('/api/products/:productId', [validate(deleteProductSchema), requireUser], deleteProductHandler);
}

export default routes;
