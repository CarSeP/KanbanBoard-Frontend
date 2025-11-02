import { SquareKanban } from "lucide-react";
import type { Board } from "../interfaces/board.interface";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";

interface Props {
  open: boolean;
  onClose: () => void;
  board: Board | undefined;
}

function BoardDetailComponent({ open, onClose, board }: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex gap-1 items-center">
            <SquareKanban />
            Board Information
          </DialogTitle>
        </DialogHeader>
        {board && (
          <div>
            <div className="py-1">
              <h3>ID:</h3>
              <span>{board.id}</span>
            </div>
            <div className="py-1">
              <h3>Name:</h3>
              <span>{board.name}</span>
            </div>
            <div className="py-1">
              <h3>Created at:</h3>
              <span>{board.createdAt.toString()}</span>
            </div>
            <div className="py-1">
              <h3>Updated at:</h3>
              <span>{board.updatedAt.toString()}</span>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default BoardDetailComponent;
