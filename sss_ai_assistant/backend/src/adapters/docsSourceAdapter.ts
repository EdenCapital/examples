export interface DocsSourceAdapter {
  getTopic(topic: string): Promise<string | null>;
}

export class MockDocsSourceAdapter implements DocsSourceAdapter {
  async getTopic(topic: string): Promise<string | null> {
    return `Mock docs topic for: ${topic}`;
  }
}
