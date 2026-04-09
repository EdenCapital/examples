interface SettingsDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function SettingsDrawer({ open, onClose }: SettingsDrawerProps) {
  return (
    <div className={`settings-drawer ${open ? 'open' : ''}`}>
      <div className="settings-header">
        <h3>Settings</h3>
        <button onClick={onClose}>Close</button>
      </div>
      <p>Theme and model settings will be added here.</p>
      <p>This is intentionally simple for now.</p>
    </div>
  );
}
