import type { Card } from "./card.interface";

export interface Column {
  id: number;
  title: string;
  order: number;
  boardID: string;
  cards: Card[];
}
