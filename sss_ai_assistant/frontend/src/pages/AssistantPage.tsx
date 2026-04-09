import { ChatPanel } from '../components/ChatPanel';

export function AssistantPage() {
  return (
    <main className="assistant-layout">
      <header className="topbar">
        <h1>SSS AI Assistant</h1>
        <p>Explain · Guide · Clarify — read-only product assistance for SSS DeFi.</p>
      </header>

      <aside className="left-card">
        <h2>Quick Actions</h2>
        <a href="/trade">Go to Trade</a>
        <a href="/portfolio">Go to Portfolio</a>
        <a href="/orders">View Orders</a>
      </aside>

      <section className="center-chat">
        <ChatPanel defaultContext={{ currentPage: 'assistant', userId: 'demo-user' }} />
      </section>

      <aside className="right-card">
        <h2>Context</h2>
        <p>Current page: assistant</p>
        <p>User profile: demo-user (mock)</p>
        <p>Purpose: explain product behavior and guide next steps.</p>
      </aside>
    </main>
  );
}
