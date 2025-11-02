import { MoreHorizontalIcon } from "lucide-react";
import type { Board } from "../interfaces/board.interface";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useSetAtom } from "jotai";
import { setModalAtom, setModalDataAtom } from "../atoms/modal";

interface Props {
  board: Board;
}

function BoardCardComponent({ board }: Props) {
  const setModal = useSetAtom(setModalAtom);
  const setModalData = useSetAtom(setModalDataAtom);

  return (
    <div className="w-96 h-46 p-6 flex justify-center">
      <Card className="w-full max-w-sm cursor-pointer hover:bg-accent">
        <CardHeader className="flex justify-between">
          <CardTitle className="text-2xl break-all">{board.name}</CardTitle>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                className="hover:bg-transparent"
                variant="ghost"
                aria-label="Open menu"
                size="icon-sm"
              >
                <MoreHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="start">
              <DropdownMenuLabel
                className="cursor-pointer"
                onClick={() => {
                  setModal("detail");
                  setModalData(board);
                }}
              >
                Info
              </DropdownMenuLabel>
              <DropdownMenuLabel
                className="cursor-pointer"
                onClick={() => {
                  setModal("upsert");
                  setModalData(board);
                }}
              >
                Edit Board
              </DropdownMenuLabel>
              <DropdownMenuLabel
                className="cursor-pointer"
                onClick={() => {
                  setModal("delete");
                  setModalData(board);
                }}
              >
                Delete Board
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
      </Card>
    </div>
  );
}

export default BoardCardComponent;
