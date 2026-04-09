import { MockDataSourceAdapter } from '../adapters/dataSourceAdapter.js';
import { MockDocsSourceAdapter } from '../adapters/docsSourceAdapter.js';
import { buildContext } from '../context/contextBuilder.js';
import type { AssistantContextInput, AssistantResponse } from '../types/assistant.js';
import { TemplateAnswerEngine } from './answerEngine.js';

const docsSource = new MockDocsSourceAdapter();
const dataSource = new MockDataSourceAdapter();
const answerEngine = new TemplateAnswerEngine();

export async function getAssistantResponse(input: AssistantContextInput): Promise<AssistantResponse> {
  const context = await buildContext(input, { docsSource, dataSource });
  return answerEngine.generateAnswer(context);
}
