import { useEffect, useState } from "react";
import type { Board } from "../interfaces/board.interface";
import BoardCardComponent from "./BoardCard";
import AddBoardComponent from "./AddBoard";
import { toast } from "sonner";

const URL = import.meta.env.VITE_BACKEND_API_URL + "/board";

function BoardGridComponent() {
  const [boards, setBoards] = useState<Board[] | null>(null);
  const onFetchBoards = async () => {
    const response = await fetch(URL);
    if (!response.ok) {
      toast.error("An error occurred while trying to retrieve data from the server.");
      return;
    }

    const { boards } = await response.json();

    setBoards(boards);
  };
  useEffect(() => {
    onFetchBoards();
  }, []);
  return (
    <section className="flex flex-wrap">
      {boards &&
        boards.map((board) => (
          <BoardCardComponent key={board.id} board={board} />
        ))}
      <AddBoardComponent />
    </section>
  );
}

export default BoardGridComponent;
