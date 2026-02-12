import { LoaderCircle, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useState, type FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "@radix-ui/react-label";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { socket } from "../lib/socket";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const URL = import.meta.env.VITE_BACKEND_API_URL + "/card";

interface Props {
  order: number;
  columnId: number;
}

interface mutationProps {
  title: string;
  content: string;
  order: number;
  columnId: number;
}

function AddCardComponent({ order, columnId }: Props) {
  const [open, setOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
      order,
      columnId,
    },
    onSubmit: async ({ value }) => {
      mutate(value);
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: mutationProps) => {
      try {
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

        toast.success("The card has been successfully created or edited.");
        socket.emit("board", {});
        onCloseModal();

        return response.json();
      } catch (error) {}
      toast.error("An error occurred while creating or editing the card.");
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
    <div>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 text-muted-foreground hover:text-foreground"
        onClick={() => setOpen(true)}
      >
        <Plus className="h-4 w-4" />
      </Button>
      <Dialog open={open} onOpenChange={onCloseModal}>
        <DialogContent>
          {open && (
            <form onSubmit={onSubmit}>
              <DialogHeader>
                <DialogTitle className="flex gap-1 items-center">
                  Create Card
                </DialogTitle>
              </DialogHeader>
              <form.Field
                name="title"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? "Title is required"
                      : value.length > 50
                        ? "The title must have a maximum of 50 characters"
                        : undefined,
                  onChangeAsyncDebounceMs: 500,
                }}
                children={(field) => (
                  <div className="py-4">
                    <Label htmlFor={field.name} className="font-normal">
                      Title
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
              <form.Field
                name="content"
                children={(field) => (
                  <div className="py-4">
                    <Label htmlFor={field.name} className="font-normal">
                      Content
                    </Label>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      rows={10}
                      className="resize-none"
                    ></Textarea>
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

export default AddCardComponent;
