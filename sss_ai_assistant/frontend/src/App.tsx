import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { AssistantPage } from './pages/AssistantPage';
import { WidgetDemoPage } from './pages/WidgetDemoPage';

export default function App() {
  return (
    <>
      <nav className="main-nav">
        <Link to="/assistant">Assistant</Link>
        <Link to="/assistant-widget-demo">Widget Demo</Link>
      </nav>
      <Routes>
        <Route path="/assistant" element={<AssistantPage />} />
        <Route path="/assistant-widget-demo" element={<WidgetDemoPage />} />
        <Route path="*" element={<Navigate to="/assistant" replace />} />
      </Routes>
    </>
  );
}
