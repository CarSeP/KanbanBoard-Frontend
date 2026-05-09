import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import type { Column } from "../interfaces/column.interface";
import CardComponent from "./Card";
import { Button } from "./ui/button";
import AddCardComponent from "./AddCard";
import { useSetAtom } from "jotai";
import { setActionAtom, setActionDataAtom } from "../atoms/boardAction";
import type { Card } from "../interfaces/card.interface";

interface Props {
  column: Column;
}

function ColunmComponent({ column }: Props) {
  const setAction = useSetAtom(setActionAtom);
  const setActionData = useSetAtom(setActionDataAtom);

  const showCard = (card: Card) => {
    setAction("detailCard");
    setActionData({ card });
  };

  return (
    <article
      id={`${column.id}`}
      className="flex w-[320px] shrink-0 flex-col rounded-xl"
    >
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
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger
              asChild
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              className="cursor-pointer"
            >
              <Button
                className="h-7 w-7 text-muted-foreground hover:text-foreground"
                variant="ghost"
                aria-label="Open menu"
                size="icon"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="start">
              <DropdownMenuLabel
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setAction("upsertColumn");
                  setActionData({ column });
                }}
              >
                Edit Column
              </DropdownMenuLabel>
              <DropdownMenuLabel
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setAction("deleteColumn");
                  setActionData({ column });
                }}
              >
                Delete Column
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex flex-col gap-2.5 rounded-xl bg-muted/50 p-2.5 min-h-[200px]">
        {column.cards &&
          column.cards.map((card) => (
            <button
              className="cursor-pointer"
              key={card.id}
              onClick={() => showCard(card)}
            >
              <CardComponent card={card} />
            </button>
          ))}
      </div>
    </article>
  );
}

export default ColunmComponent;
