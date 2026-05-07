import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { actionAtom, actionDataAtom } from "../atoms/boardAction";
import { useAtom } from "jotai";
import UpsertColumnComponent from "./UpsertColumn";
import deleteColumnComponent from "./DeleteColumn";
import UpsertCardComponent from "./UpsertCard";

const modalComponents = {
  upsertColumn: UpsertColumnComponent,
  deleteColumn: deleteColumnComponent,
  upsertCard: UpsertCardComponent,
  none: null,
};

function ModalActionComponent() {
  const [open, setOpen] = useState(false);
  const [actionType, setActionType] = useAtom(actionAtom);
  const [value] = useAtom(actionDataAtom);

  const onClose = () => {
    setOpen(false);
    setActionType("none");
  };

  useEffect(() => {
    if (actionType !== "none") {
      setOpen(true);
    }
  }, [actionType]);

  const ModalComponent = modalComponents[actionType];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        {ModalComponent && <ModalComponent onClose={onClose} value={value} />}
      </DialogContent>
    </Dialog>
  );
}

export default ModalActionComponent;
