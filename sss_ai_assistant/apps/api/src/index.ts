import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { createRouter } from './routes';
import { ContextRepository } from './repositories/contextRepository';
import { SessionRepository } from './repositories/sessionRepository';
import { ContextService } from './services/contextService';
import { ChatService } from './services/chatService';
import { ApiController } from './controllers/apiController';
import { InMemoryCache } from './utils/cache';

const app = express();

app.use(cors());
app.use(express.json());

const contextRepository = new ContextRepository();
const sessionRepository = new SessionRepository();
const contextService = new ContextService(contextRepository, new InMemoryCache());
const chatService = new ChatService(contextService, sessionRepository);
const controller = new ApiController(chatService, contextService, sessionRepository);

app.use(createRouter(controller));

app.listen(env.port, () => {
  console.log(`API listening on http://localhost:${env.port}`);
});
