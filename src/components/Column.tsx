import { MoreHorizontal } from "lucide-react";
import type { Column } from "../interfaces/column.interface";
import CardComponent from "./Card";
import { Button } from "./ui/button";
import AddCardComponent from "./AddCard";

interface Props {
  column: Column;
}

function ColunmComponent({ column }: Props) {
  return (
    <article className="flex w-[320px] shrink-0 flex-col rounded-xl lg:w-auto lg:min-w-0 lg:flex-1">
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-ring" />
          <h3 className="text-sm font-semibold text-foreground">
            {column.title}
          </h3>
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-muted px-1.5 text-[11px] font-medium text-muted-foreground">
            {column.cards.length}
          </span>
        </div>
        <div className="flex items-center gap-0.5">
          <AddCardComponent
            order={column.cards?.length ?? 0}
            columnId={column.id}
          />
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-foreground"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Column options</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2.5 rounded-xl bg-muted/50 p-2.5 min-h-[200px]">
        {column.cards &&
          column.cards.map((card) => (
            <CardComponent card={card} key={card.id} />
          ))}
      </div>
    </article>
  );
}

export default ColunmComponent;
