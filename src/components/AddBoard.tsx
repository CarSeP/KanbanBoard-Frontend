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

const URL = import.meta.env.VITE_BACKEND_API_URL + "/board";

function AddBoardComponent() {
  const closeRef = useRef<HTMLButtonElement>(null);

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

    const name = e.target.name.value;
    mutate(name);
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
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" />
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
