import { Session } from '../types';

interface SidebarProps {
  sessions: Session[];
  activeSessionId: string;
  onSelect: (sessionId: string) => void;
}

export function Sidebar({ sessions, activeSessionId, onSelect }: SidebarProps) {
  return (
    <aside className="sidebar">
      <h2>Sessions</h2>
      <ul>
        {sessions.map((session) => (
          <li key={session.id}>
            <button
              className={session.id === activeSessionId ? 'active' : ''}
              onClick={() => onSelect(session.id)}
            >
              {session.title}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
