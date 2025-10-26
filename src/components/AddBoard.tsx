import { useRef, type FormEvent } from "react";
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

const URL = import.meta.env.VITE_BACKEND_API_URL + "/board";

function AddBoardComponent() {
  const closeRef = useRef<HTMLButtonElement>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const name = e.target.name.value;

    const request = new Request(URL, {
      method: "PUT",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await fetch(request);

    if (response.ok && closeRef.current) {
      closeRef.current.click();
    }
  };
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
            <Button className="cursor-pointer" type="submit">
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddBoardComponent;
