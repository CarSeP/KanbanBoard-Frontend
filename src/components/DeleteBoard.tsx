import type { Board } from "../interfaces/board.interface";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { type FormEvent } from "react";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { socket } from "../lib/socket";
import { authErrorHandler } from "@/lib/auth";

interface Props {
  onClose: () => void;
  board: Board | undefined;
}

const URL = import.meta.env.VITE_BACKEND_API_URL + "/board/";

function DeleteBoardComponent({ onClose, board }: Props) {
  const form = useForm({
    onSubmit: async () => {
      mutate();
    },
  });

  const onCloseModal = () => {
    form.reset();
    onClose();
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const response = await fetch(URL + board?.id, {
          method: "DELETE",
          credentials: "include",
        });

        if (authErrorHandler(response.status)) {
          return;
        }

        if (!response.ok) {
          throw new Error();
        }

        toast.success("The board has been successfully deleted.");
        socket.emit("board", { boardId: board?.id });
        onCloseModal();

        return response.json();
      } catch {
        toast.error("An error occurred while deleting the board.");
      }
    },
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    form.handleSubmit();
  };

  return (
    <form onSubmit={onSubmit}>
      <DialogHeader className="pt-4">
        <DialogTitle>Are you sure you want to delete this board?</DialogTitle>
        <DialogDescription />
      </DialogHeader>
      <DialogFooter className="pt-10">
        <Button
          className="cursor-pointer"
          variant="outline"
          onClick={onCloseModal}
          type="button"
        >
          Cancel
        </Button>
        <Button className="cursor-pointer" type="submit" disabled={isPending}>
          Delete {isPending && <LoaderCircle className="animate-spin" />}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default DeleteBoardComponent;
