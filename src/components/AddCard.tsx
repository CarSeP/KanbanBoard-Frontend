import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { setActionAtom, setActionDataAtom } from "../atoms/boardAction";
import { useSetAtom } from "jotai";

interface Props {
  order: number;
  columnId: number;
}

function AddCardComponent({ order, columnId }: Props) {
  const setAction = useSetAtom(setActionAtom);
  const setActionData = useSetAtom(setActionDataAtom);

  return (
    <div>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 text-muted-foreground hover:text-foreground cursor-pointer"
        onClick={() => {
          setAction("upsertCard");
          setActionData({ order, parentId: columnId });
        }}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default AddCardComponent;
