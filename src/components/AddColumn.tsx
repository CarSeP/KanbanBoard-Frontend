import { Button } from "./ui/button";
import { setActionAtom, setActionDataAtom } from "../atoms/boardAction";
import { useSetAtom } from "jotai";

interface Props {
  order: number;
  boardId: string;
}

function AddColumnComponent({ order, boardId }: Props) {
  const setAction = useSetAtom(setActionAtom);
  const setActionData = useSetAtom(setActionDataAtom);

  return (
    <div className="px-4">
      <Button
        variant="outline"
        className="cursor-pointer"
        onClick={() => {
          setAction("upsertColumn");
          setActionData({ order, parentId: boardId });
        }}
      >
        Add new column
      </Button>
    </div>
  );
}

export default AddColumnComponent;
