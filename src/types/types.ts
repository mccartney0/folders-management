export interface Directory {
  id: number;
  user: string;
  name: string;
  parent: number | null;
}