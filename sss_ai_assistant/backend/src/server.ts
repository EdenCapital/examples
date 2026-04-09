import cors from 'cors';
import express from 'express';
import { assistantRouter } from './routes/assistant.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'sss_ai_assistant_backend' });
});

app.use('/api/assistant', assistantRouter);

const port = Number(process.env.PORT || 4173);
app.listen(port, () => {
  console.log(`SSS AI Assistant backend listening on :${port}`);
});
