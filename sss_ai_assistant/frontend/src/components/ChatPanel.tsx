import { FormEvent, useState } from 'react';
import { askAssistant } from '../lib/api';
import { suggestedQuestions } from '../mock/suggestions';
import type { AssistantContextInput, ChatMessage } from '../types/assistant';

type ChatPanelProps = {
  defaultContext?: Omit<AssistantContextInput, 'question'>;
  compact?: boolean;
};

export function ChatPanel({ defaultContext, compact = false }: ChatPanelProps) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      text: 'Hello. I can explain SSS product concepts, guide next steps, and clarify account or order status questions.'
    }
  ]);

  const sendQuestion = async (question: string) => {
    if (!question.trim()) return;
    const userText = question.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setLoading(true);
    try {
      const response = await askAssistant({ question: userText, ...defaultContext });
      setMessages((prev) => [...prev, { role: 'assistant', text: response.answer, response }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'I could not reach the assistant service. Please check backend connection and try again.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await sendQuestion(input);
  };

  return (
    <section className={`chat-panel ${compact ? 'compact' : ''}`}>
      <div className="suggestions">
        {suggestedQuestions.map((question) => (
          <button key={question} onClick={() => sendQuestion(question)}>
            {question}
          </button>
        ))}
      </div>
      <div className="messages">
        {messages.map((message, index) => (
          <article className={`message ${message.role}`} key={`${message.role}-${index}`}>
            <p>{message.text}</p>
            {message.role === 'assistant' && message.response?.explanation ? (
              <p className="explanation">{message.response.explanation}</p>
            ) : null}
            {message.role === 'assistant' && message.response?.actions?.length ? (
              <div className="actions">
                {message.response.actions.map((action) => (
                  <a key={action.label} href={action.target}>
                    {action.label}
                  </a>
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>
      <form onSubmit={onSubmit} className="composer">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about SSS concepts, pages, or order status..."
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Thinking...' : 'Send'}
        </button>
      </form>
    </section>
  );
}
