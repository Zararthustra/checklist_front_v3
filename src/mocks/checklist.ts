import { ICategory, ITask } from '@interfaces/index';

export const categories: ICategory[] = [
  {
    id: '411ac8bb-e1e2-4616-8f91-24b03c90f634',
    name: 'my category 1',
    color: '#0f0',
    isHidden: false,
    owner: 4
  },
  {
    id: '411ac8bb-e1e2-4616-8f91-24b03c90f635',
    name: 'my category 2',
    color: '#0ff',
    isHidden: true,
    owner: 4
  }
];

export const tasks: ITask[] = [
  {
    id: '0d92b2a1-1d5d-4280-a914-ee0448da381d',
    name: 'my task 1',
    owner: 4,
    category: '411ac8bb-e1e2-4616-8f91-24b03c90f634'
  }
];
