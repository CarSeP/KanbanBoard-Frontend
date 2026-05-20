import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { LoaderCircle } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { socket } from "../lib/socket";
import type { FormEvent } from "react";
import { Button } from "./ui/button";
import type { ActionValue } from "../interfaces/action.interface";
import { authErrorHandler } from "@/lib/auth";

interface Props {
  onClose: () => void;
  value: ActionValue | undefined;
}

interface mutationProps {
  id?: number;
  title: string;
  order: number;
  boardId: string;
}

const URL = import.meta.env.VITE_BACKEND_API_URL + "/column";

function UpsertColumnComponent({ onClose, value }: Props) {
  const form = useForm({
    defaultValues: {
      id: 0,
      title: "",
      order: 0,
      boardId: "",
    },
    onSubmit: async ({ value }) => {
      mutate(value);
    },
  });

  const onCloseModal = () => {
    form.reset();
    onClose();
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: mutationProps) => {
      try {
        if (!payload.id) {
          delete payload.id;
        }

        const response = await fetch(URL, {
          method: "PUT",
          body: JSON.stringify(payload),
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (authErrorHandler(response.status)) {
          return;
        }

        if (!response.ok) {
          throw new Error();
        }

        toast.success("The column has been successfully created or edited.");
        socket.emit("board", {
          boardId: value?.column?.boardId || value?.parentId,
        });
        onCloseModal();

        return response.json();
      } catch {
        toast.error("An error occurred while creating or editing the column.");
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
        <DialogTitle className="flex gap-1 items-center">
          {value?.column ? "Update Column" : "Create Column"}
        </DialogTitle>
        <DialogDescription />
      </DialogHeader>
      <form.Field
        defaultValue={value?.column?.id}
        name="id"
        children={(field) => (
          <Input type="hidden" name={field.name} value={field.state.value} />
        )}
      />
      <form.Field
        defaultValue={value?.column?.order ?? value?.order}
        name="order"
        children={(field) => (
          <Input type="hidden" name={field.name} value={field.state.value} />
        )}
      />
      <form.Field
        defaultValue={value?.column?.boardId ?? value?.parentId?.toString()}
        name="boardId"
        children={(field) => (
          <Input type="hidden" name={field.name} value={field.state.value} />
        )}
      />
      <form.Field
        defaultValue={value?.column?.title}
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
          {value?.column ? "Update " : "Create "}
          {isPending && <LoaderCircle className="animate-spin" />}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default UpsertColumnComponent;
