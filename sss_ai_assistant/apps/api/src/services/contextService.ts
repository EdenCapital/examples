import { ContextRepository } from '../repositories/contextRepository';
import { InMemoryCache } from '../utils/cache';
import { ContextData, ContextDocument } from '@sss/shared';

export class ContextService {
  constructor(
    private contextRepository: ContextRepository,
    private cache: InMemoryCache<ContextDocument[] | ContextData[]>,
  ) {}

  getDocs(): ContextDocument[] {
    const cacheKey = 'docs';
    const cached = this.cache.get(cacheKey);
    if (cached) return cached as ContextDocument[];

    const docs = this.contextRepository.getDocs();
    this.cache.set(cacheKey, docs);
    return docs;
  }

  getData(): ContextData[] {
    const cacheKey = 'data';
    const cached = this.cache.get(cacheKey);
    if (cached) return cached as ContextData[];

    const data = this.contextRepository.getData();
    this.cache.set(cacheKey, data);
    return data;
  }
}
