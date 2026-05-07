import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import type { ActionValue } from "../interfaces/action.interface";
import { CalendarDays, Clock, Trash2, Pencil } from "lucide-react";
import { formatDate, formatTime } from "../lib/time";
import { useSetAtom } from "jotai";
import { setActionAtom, setActionDataAtom } from "../atoms/boardAction";

interface Props {
  onClose: () => void;
  value: ActionValue | undefined;
}

function DetailCardComponent({ onClose, value }: Props) {
  const card = value?.card;
  const setAction = useSetAtom(setActionAtom);
  const setActionData = useSetAtom(setActionDataAtom);

  return (
    <>
      <DialogHeader className="pt-4 relative">
        <DialogTitle className="pr-10 text-xl font-semibold tracking-tight leading-tight">
          {card?.title || "Untitled Card"}
        </DialogTitle>
        <DialogDescription />
      </DialogHeader>
      <div className="space-y-6 py-6 max-h-[50vh] overflow-y-auto pr-2">
        {card?.content && (
          <div className="space-y-3">
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Description
            </h3>
            <div className="rounded-lg py-4 text-sm leading-relaxed whitespace-pre-wrap">
              {card.content}
            </div>
          </div>
        )}
        <div className="flex flex-col gap-4 pt-2">
          <div className="space-y-2">
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground flex gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 mt-0.5" />
              {`Created ${formatDate(card?.createdAt)} ${formatTime(card?.createdAt)}`}
            </h3>
          </div>
          <div className="space-y-2">
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground flex gap-1.5">
              <Clock className="h-3.5 w-3.5 mt-0.5" />
              {`Updated ${formatDate(card?.updatedAt)} ${formatTime(card?.updatedAt)}`}
            </h3>
          </div>
        </div>
      </div>
      <DialogFooter className="pt-10 gap-2 sm:justify-end">
        <Button
          variant="destructive"
          className="gap-2 cursor-pointer"
          onClick={() => {
            setAction("deleteCard");
            setActionData({ card });
          }}
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
        <Button
          className="gap-2 cursor-pointer"
          onClick={() => {
            setAction("upsertCard");
            setActionData({ card });
          }}
        >
          <Pencil className="h-4 w-4" />
          Edit
        </Button>
        <Button
          variant="outline"
          onClick={onClose}
          className="gap-2 cursor-pointer"
        >
          Cancel
        </Button>
      </DialogFooter>
    </>
  );
}

export default DetailCardComponent;
