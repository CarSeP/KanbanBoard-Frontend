import type { ActionValue } from "../interfaces/action.interface";
import {
  DialogDescription,
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
import type { FormEvent } from "react";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";
import { useSetAtom } from "jotai";
import { setActionAtom, setActionDataAtom } from "../atoms/boardAction";

interface Props {
  onClose: () => void;
  value: ActionValue | undefined;
}

interface mutationProps {
  id?: number;
  title: string;
  content: string;
  order: number;
  columnId: number;
}

const URL = import.meta.env.VITE_BACKEND_API_URL + "/card";

function UpsertCardComponent({ onClose, value }: Props) {
  const setAction = useSetAtom(setActionAtom);
  const setActionData = useSetAtom(setActionDataAtom);

  const form = useForm({
    defaultValues: {
      id: 0,
      title: "",
      content: "",
      order: 0,
      columnId: 0,
    },
    onSubmit: async ({ value }) => {
      mutate(value);
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: mutationProps) => {
      try {
        if (!payload.id) {
          delete payload.id;
        }

        const response = await fetch(URL, {
          method: "PUT",
          credentials: "include",
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

        const data = await response.json();
        if (data.success && data.card) {
          setActionData({ card: data.card });
          onOpenModal();
          return true;
        }

        onCloseModal();

        return true;
      } catch {
        toast.error("An error occurred while creating or editing the card.");
      }
    },
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    form.handleSubmit();
  };

  const onCloseModal = () => {
    form.reset();
    onClose();
  };

  const onOpenModal = () => {
    if (value?.card) {
      form.reset();
      setAction("detailCard");
    }

    onClose();
  };

  return (
    <form onSubmit={onSubmit}>
      <DialogHeader className="pt-4">
        <DialogTitle className="flex gap-1 items-center">
          {value?.card ? "Update Card" : "Create Card"}
        </DialogTitle>
        <DialogDescription />
      </DialogHeader>
      <form.Field
        defaultValue={value?.card?.id}
        name="id"
        children={(field) => (
          <Input type="hidden" name={field.name} value={field.state.value} />
        )}
      />
      <form.Field
        defaultValue={value?.card?.order ?? value?.order}
        name="order"
        children={(field) => (
          <Input type="hidden" name={field.name} value={field.state.value} />
        )}
      />
      <form.Field
        defaultValue={value?.card?.columnId ?? Number(value?.parentId)}
        name="columnId"
        children={(field) => (
          <Input type="hidden" name={field.name} value={field.state.value} />
        )}
      />
      <form.Field
        defaultValue={value?.card?.title}
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
        defaultValue={value?.card?.content}
        name="content"
        children={(field) => (
          <div className="py-4">
            <Label htmlFor={field.name} className="font-normal">
              Description
            </Label>
            <Textarea
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="resize-none h-40"
            ></Textarea>
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
          onClick={onOpenModal}
          type="button"
        >
          Cancel
        </Button>
        <Button className="cursor-pointer" type="submit" disabled={isPending}>
          {value?.card ? "Update " : "Create "}
          {isPending && <LoaderCircle className="animate-spin" />}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default UpsertCardComponent;
