import { DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { type FormEvent } from "react";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { socket } from "../lib/socket";
import type { ActionValue } from "../interfaces/action.interface";

interface Props {
  onClose: () => void;
  value: ActionValue | undefined;
}

const URL = import.meta.env.VITE_BACKEND_API_URL + "/column";

function deleteColumnComponent({ onClose, value }: Props) {
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
        const response = await fetch(`${URL}/${value?.column?.id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error();
        }

        toast.success("The column has been successfully deleted.");
        socket.emit("board", {});
        onCloseModal();

        return response.json();
      } catch (error) {
        toast.error("An error occurred while deleting the column.");
      }
    },
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    form.handleSubmit();
  };

  return (
    <form onSubmit={onSubmit}>
      <DialogHeader>
        <DialogTitle>Are you sure you want to delete this column?</DialogTitle>
      </DialogHeader>
      <DialogFooter>
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

export default deleteColumnComponent;
