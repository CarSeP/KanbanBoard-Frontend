import { useQuery } from "@tanstack/react-query";
import type { Board } from "../interfaces/board.interface";
import BoardCardComponent from "./BoardCard";
import AddBoardComponent from "./AddBoard";
import { toast } from "sonner";
import LoaderComponent from "./Loader";
import { useEffect } from "react";

const URL = import.meta.env.VITE_BACKEND_API_URL + "/board";

function BoardGridComponent() {
  const { isPending, error, data } = useQuery({
    queryKey: ["getBoards"],
    queryFn: () => fetch(URL).then((res) => res.json()),
  });

  useEffect(() => {
    if (error || (data && !data.success)) {
      toast.error(
        "An error occurred while trying to retrieve data from the server.",
      );
    }
  }, [error, data]);

  if (isPending) {
    return <LoaderComponent />;
  }

  return (
    <section className="flex flex-wrap">
      {data.boards &&
        data.boards.map((board: Board) => (
          <BoardCardComponent key={board.id} board={board} />
        ))}
      <AddBoardComponent />
    </section>
  );
}

export default BoardGridComponent;
