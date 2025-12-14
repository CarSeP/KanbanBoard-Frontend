export interface Card {
  id: number;
  title: string;
  order: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  columnId: number;
}
