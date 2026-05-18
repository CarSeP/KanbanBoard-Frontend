import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { type FormEvent } from "react";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { socket } from "../lib/socket";
import type { ActionValue } from "../interfaces/action.interface";
import { useSetAtom } from "jotai";
import { setActionAtom, setActionDataAtom } from "../atoms/boardAction";

const URL = import.meta.env.VITE_BACKEND_API_URL + "/card";

interface Props {
  onClose: () => void;
  value: ActionValue | undefined;
}

function DeleteCardComponent({ onClose, value }: Props) {
  const setAction = useSetAtom(setActionAtom);
  const setActionData = useSetAtom(setActionDataAtom);

  const form = useForm({
    onSubmit: async () => {
      mutate();
    },
  });

  const onCloseModal = () => {
    form.reset();
    onClose();
  };

  const onCancelAction = () => {
    form.reset();
    setAction("detailCard");
    setActionData({ card: value?.card });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const response = await fetch(`${URL}/${value?.card?.id}`, {
          method: "DELETE",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error();
        }

        toast.success("The card has been successfully deleted.");
        socket.emit("board", { boardId: value?.boardId });
        onCloseModal();

        return response.json();
      } catch (error) {
        toast.error("An error occurred while deleting the card.");
        onCancelAction();
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
        <DialogTitle>Are you sure you want to delete this card?</DialogTitle>
        <DialogDescription />
      </DialogHeader>
      <DialogFooter className="pt-10">
        <Button
          className="cursor-pointer"
          variant="outline"
          onClick={onCancelAction}
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

export default DeleteCardComponent;
