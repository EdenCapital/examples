import docs from '../data/docs.json';
import dataset from '../data/data.json';
import { ContextData, ContextDocument } from '@sss/shared';

export class ContextRepository {
  getDocs(): ContextDocument[] {
    return docs;
  }

  getData(): ContextData[] {
    return dataset;
  }
}
