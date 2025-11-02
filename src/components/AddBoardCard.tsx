import { useSetAtom } from "jotai";
import { Card, CardTitle } from "./ui/card";
import { setModalAtom, setModalDataAtom } from "../atoms/modal";

function AddBoardCardComponent() {
  const setModal = useSetAtom(setModalAtom);
  const setModalData = useSetAtom(setModalDataAtom);

  return (
    <div
      className="w-96 h-46 p-6 flex justify-center"
      onClick={() => {
        setModal("upsert");
        setModalData(undefined);
      }}
    >
      <Card className="flex items-center justify-center w-full max-w-sm cursor-pointer border-dashed hover:bg-accent">
        <CardTitle className="text-2xl text-muted-foreground">
          Create Board
        </CardTitle>
      </Card>
    </div>
  );
}

export default AddBoardCardComponent;
