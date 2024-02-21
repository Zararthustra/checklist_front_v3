export type { ICategory, ITask };

interface ICategory {
  id: string;
  name: string;
  color: string;
  isHidden: boolean;
  owner: number;
}

interface ITask {
  id: string;
  category: ICategory['id'];
  name: string;
  owner: number;
}
