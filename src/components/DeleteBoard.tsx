import type { Board } from "../interfaces/board.interface";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { useRef, type FormEvent } from "react";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
  board: Board | undefined;
}

const URL = import.meta.env.VITE_BACKEND_API_URL + "/board/";

function DeleteBoardComponent({ open, onClose, board }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const form = useForm({
    onSubmit: async () => {
      mutate();
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const response = await fetch(URL + board?.id, {
          method: "DELETE",
        });

        if (!response.ok) {
          toast.error("An error occurred while deleting the board.");
        }

        if (response.ok) {
          toast.success("The board has been successfully deleted.");
        }

        if (closeRef.current) {
          closeRef.current.click();
        }

        return response.json();
      } catch (error) {
        toast.error("An error occurred while deleting the board.");
      }
    },
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    form.handleSubmit();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this board?
            </DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button
              className="cursor-pointer"
              variant="outline"
              onClick={onClose}
              ref={closeRef}
              type="button"
            >
              Cancel
            </Button>
            <Button
              className="cursor-pointer"
              type="submit"
              disabled={isPending}
            >
              Delete {isPending && <LoaderCircle className="animate-spin" />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteBoardComponent;
