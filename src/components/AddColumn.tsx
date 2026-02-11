import { useState, type FormEvent } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { LoaderCircle } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";
import { toast } from "sonner";
import { socket } from "../lib/socket";

const URL = import.meta.env.VITE_BACKEND_API_URL + "/column";

interface Props {
  order: number;
  boardId: string;
}

function AddColumnComponent({ order, boardId }: Props) {
  const [open, setOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      title: "",
      order: 0,
      boardId: "",
    },
    onSubmit: async ({ value }) => {
      mutate([value.title, value.order, value.boardId]);
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async ([title, order, boardId]: [string, number, string]) => {
      try {
        const payload = { title, order, boardId };

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

        toast.success("The column has been successfully created or edited.");
        socket.emit("board", {});
        onCloseModal();

        return response.json();
      } catch (error) {}
      toast.error("An error occurred while creating or editing the column.");
    },
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    form.handleSubmit();
  };

  const onCloseModal = () => {
    form.reset();
    setOpen(false);
  };

  return (
    <div className="px-4">
      <Button
        variant="outline"
        className="cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Add new colunm
      </Button>
      <Dialog open={open} onOpenChange={onCloseModal}>
        <DialogContent>
          {open && (
            <form onSubmit={onSubmit}>
              <DialogHeader>
                <DialogTitle className="flex gap-1 items-center">
                  Create Column
                </DialogTitle>
              </DialogHeader>
              <form.Field
                defaultValue={order}
                name="order"
                children={(field) => (
                  <Input
                    type="hidden"
                    name={field.name}
                    value={field.state.value}
                  />
                )}
              />
              <form.Field
                defaultValue={boardId}
                name="boardId"
                children={(field) => (
                  <Input
                    type="hidden"
                    name={field.name}
                    value={field.state.value}
                  />
                )}
              />
              <form.Field
                name="title"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? "Name is required"
                      : value.length > 50
                        ? "The board must have a maximum of 50 characters"
                        : undefined,
                  onChangeAsyncDebounceMs: 500,
                }}
                children={(field) => (
                  <div className="py-4">
                    <Label htmlFor={field.name} className="font-normal">
                      Name
                    </Label>
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
                <Button
                  className="cursor-pointer"
                  type="submit"
                  disabled={isPending}
                >
                  Create{" "}
                  {isPending && <LoaderCircle className="animate-spin" />}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddColumnComponent;
