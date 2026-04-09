import { FormEvent, useEffect, useState } from 'react';
import { fetchSessions, sendMessage } from './api';
import { ChatMessage, Session } from './types';
import { Sidebar } from './components/Sidebar';
import { SettingsDrawer } from './components/SettingsDrawer';

const defaultSession: Session = {
  id: crypto.randomUUID(),
  title: 'New Session',
  updatedAt: new Date().toISOString(),
};

export function App() {
  const [sessions, setSessions] = useState<Session[]>([defaultSession]);
  const [activeSessionId, setActiveSessionId] = useState<string>(defaultSession.id);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    fetchSessions()
      .then((remoteSessions) => {
        if (remoteSessions.length > 0) {
          setSessions(remoteSessions);
          setActiveSessionId(remoteSessions[0].id);
        }
      })
      .catch(() => {
        // keep local default session when API has no sessions yet
      });
  }, []);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const outgoing = input;
    setInput('');

    try {
      const result = await sendMessage(activeSessionId, outgoing);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: result.reply,
          timestamp: new Date().toISOString(),
        },
      ]);

      setSessions((prev) => {
        if (prev.some((s) => s.id === activeSessionId)) return prev;
        return [{ id: activeSessionId, title: 'Session', updatedAt: new Date().toISOString() }, ...prev];
      });
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'The API is unreachable. Start apps/api and try again.',
          timestamp: new Date().toISOString(),
        },
      ]);
    }
  }

  return (
    <div className="layout">
      <Sidebar sessions={sessions} activeSessionId={activeSessionId} onSelect={setActiveSessionId} />
      <main className="main">
        <header className="header">
          <h1>SSS AI Assistant</h1>
          <button onClick={() => setSettingsOpen(true)}>Settings</button>
        </header>

        <section className="chat-window">
          {messages.length === 0 ? (
            <p className="placeholder">Ask about SSS docs or data to start.</p>
          ) : (
            messages.map((msg, idx) => (
              <div key={`${msg.timestamp}-${idx}`} className={`bubble ${msg.role}`}>
                <strong>{msg.role === 'user' ? 'You' : 'Assistant'}:</strong> {msg.content}
              </div>
            ))
          )}
        </section>

        <form className="chat-form" onSubmit={onSubmit}>
          <input
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </main>

      <SettingsDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}
