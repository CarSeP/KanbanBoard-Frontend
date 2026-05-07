import type { Card } from "./card.interface";
import type { Column } from "./column.interface";

export interface ActionValue {
  column?: Column;
  card?: Card;
  parentId?: string | number;
  order?: number;
}
