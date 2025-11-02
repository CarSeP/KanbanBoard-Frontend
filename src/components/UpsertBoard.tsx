import type { Board } from "../interfaces/board.interface";
import { DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import type { FormEvent } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { toast } from "sonner";

interface Props {
  onClose: () => void;
  board: Board | undefined;
}

const URL = import.meta.env.VITE_BACKEND_API_URL + "/board";

function UpsertBoardComponent({ onClose, board }: Props) {
  const form = useForm({
    defaultValues: {
      id: "",
      name: "",
    },
    onSubmit: async ({ value }) => {
      mutate([value.id, value.name]);
    },
  });

  const onCloseModal = () => {
    form.reset();
    onClose();
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async ([id, name]: [string, string]) => {
      try {
        const payload: any = { name };

        if (id && id.trim() !== "") {
          payload.id = id;
        }

        const response = await fetch(URL, {
          method: "PUT",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error();
        }

        toast.success("The board has been successfully created or edited.");
        onCloseModal();

        return response.json();
      } catch (error) {
        toast.error("An error occurred while creating or editing the board.");
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
        <DialogTitle>{board ? "Update Board" : "Create Board"}</DialogTitle>
      </DialogHeader>
      <form.Field
        defaultValue={board?.id}
        name="id"
        children={(field) => (
          <Input type="hidden" name={field.name} value={field.state.value} />
        )}
      />
      <form.Field
        defaultValue={board?.name}
        name="name"
        validators={{
          onChange: ({ value }) =>
            !value
              ? "Name is required"
              : value.length > 30
              ? "The board must have a maximum of 30 characters"
              : undefined,
          onChangeAsyncDebounceMs: 500,
        }}
        children={(field) => (
          <div className="py-4">
            <Label htmlFor={field.name}>Name</Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            {field.state.meta.errors ? (
              <p className="text-red-500 text-sm mt-1">
                {field.state.meta.errors.join(", ")}
              </p>
            ) : null}
          </div>
        )}
      />
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
          {board ? "Update" : "Create"}{" "}
          {isPending && <LoaderCircle className="animate-spin" />}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default UpsertBoardComponent;
