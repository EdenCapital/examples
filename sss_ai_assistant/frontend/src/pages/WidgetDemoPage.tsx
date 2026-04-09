import { AssistantWidget } from '../widgets/AssistantWidget';

export function WidgetDemoPage() {
  return (
    <main className="widget-demo">
      <h1>Assistant Widget Demo</h1>
      <p>This page demonstrates an embeddable assistant launcher for future integration into SSS frontend surfaces.</p>
      <AssistantWidget />
    </main>
  );
}
