import { mockOrders } from '../mock/orders.js';
import { mockUserSummary } from '../mock/user.js';

export interface DataSourceAdapter {
  getUserSummary(userId: string): Promise<typeof mockUserSummary>;
  getOrders(userId: string): Promise<typeof mockOrders>;
}

export class MockDataSourceAdapter implements DataSourceAdapter {
  async getUserSummary(): Promise<typeof mockUserSummary> {
    return mockUserSummary;
  }

  async getOrders(): Promise<typeof mockOrders> {
    return mockOrders;
  }
}
