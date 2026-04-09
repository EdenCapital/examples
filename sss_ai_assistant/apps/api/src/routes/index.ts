import { Router } from 'express';
import { ApiController } from '../controllers/apiController';

export const createRouter = (controller: ApiController): Router => {
  const router = Router();

  router.get('/health', controller.health.bind(controller));
  router.post('/api/chat', controller.chat.bind(controller));
  router.get('/api/context/docs', controller.docs.bind(controller));
  router.get('/api/context/data', controller.data.bind(controller));
  router.get('/api/sessions', controller.sessions.bind(controller));

  return router;
};
