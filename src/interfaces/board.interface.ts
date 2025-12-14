import type { Column } from "./column.interface";

export interface Board {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  columns?: Column[];
}
