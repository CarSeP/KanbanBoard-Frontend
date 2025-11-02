import { useAtom } from "jotai";
import { Dialog, DialogContent } from "./ui/dialog";
import { useEffect, useState } from "react";
import BoardDetailComponent from "./BoardDetail";
import DeleteBoardComponent from "./DeleteBoard";
import UpsertBoardComponent from "./UpsertBoard";
import { modalAtom, modalDataAtom } from "../atoms/modal";

const modalComponents = {
  detail: BoardDetailComponent,
  delete: DeleteBoardComponent,
  upsert: UpsertBoardComponent,
  none: null,
};

function ModalBoardComponent() {
  const [modalValue, setModal] = useAtom(modalAtom);
  const [selectedBoardValue] = useAtom(modalDataAtom);

  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
    setModal("none");
  };

  useEffect(() => {
    if (modalValue !== "none") {
      setOpen(true);
    }
  }, [modalValue]);

  const ModalComponent = modalComponents[modalValue];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        {ModalComponent && (
          <ModalComponent onClose={onClose} board={selectedBoardValue} />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ModalBoardComponent;
