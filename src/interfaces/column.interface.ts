import type { Card } from "./card.interface";

export interface Column {
  id: number;
  title: string;
  order: number;
  boardId: string;
  cards: Card[];
}
