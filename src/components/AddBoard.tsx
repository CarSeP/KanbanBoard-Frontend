import { useEffect, useRef, type FormEvent } from "react";
import { Button } from "./ui/button";
import { Card, CardTitle } from "./ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useForm } from "@tanstack/react-form";

const URL = import.meta.env.VITE_BACKEND_API_URL + "/board";

function AddBoardComponent() {
  const closeRef = useRef<HTMLButtonElement>(null);
  const form = useForm({
    defaultValues: {
      name: "",
    },
    onSubmit: async ({ value }) => {
      mutate(value.name);
      form.reset();
    },
  });

  const { mutate, isPending, error, data } = useMutation({
    mutationFn: async (name: string) => {
      const response = await fetch(URL, {
        method: "PUT",
        body: JSON.stringify({ name }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    },
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    form.handleSubmit();
  };

  useEffect(() => {
    if (error || (data && !data.success)) {
      toast.error("An error occurred while creating the board.");
    }

    if (data && data.success && closeRef.current) {
      toast.success("The board has been successfully created.");
      closeRef.current.click();
      return;
    }
  }, [error, data]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-96 h-46 p-6 flex justify-center">
          <Card className="flex items-center justify-center w-full max-w-sm cursor-pointer border-dashed hover:bg-accent">
            <CardTitle className="text-2xl text-muted-foreground">
              Create Board
            </CardTitle>
          </Card>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create Board</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 pb-4">
            <div className="grid gap-3">
              <form.Field
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
                  <>
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
                  </>
                )}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                ref={closeRef}
                className="cursor-pointer"
                variant="outline"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="cursor-pointer"
              type="submit"
              disabled={isPending}
            >
              Submit
              {isPending && <LoaderCircle className="animate-spin" />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddBoardComponent;
