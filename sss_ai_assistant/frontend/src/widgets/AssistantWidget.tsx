import { useState } from 'react';
import { ChatPanel } from '../components/ChatPanel';

export function AssistantWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="assistant-widget">
      {open ? (
        <div className="widget-panel">
          <div className="widget-header">
            <strong>SSS Assistant</strong>
            <button onClick={() => setOpen(false)}>Close</button>
          </div>
          <ChatPanel compact defaultContext={{ currentPage: 'trade', objectType: 'order', objectId: 'ord-1001', userId: 'demo-user' }} />
        </div>
      ) : null}
      <button className="launcher" onClick={() => setOpen((v) => !v)}>
        {open ? 'Hide Assistant' : 'Open Assistant'}
      </button>
    </div>
  );
}
