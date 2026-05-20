import { useQuery } from "@tanstack/react-query";
import LoaderComponent from "../components/Loader";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import { socket } from "../lib/socket";
import { authErrorHandler } from "@/lib/auth";
import BoardComponent from "../components/Board";
import BoardHeaderComponent from "../components/BoardHeader";

const URL = import.meta.env.VITE_BACKEND_API_URL + "/board";

function BoardDetailPage() {
  const params = useParams();
  const id = params.id;

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["getBoard"],
    queryFn: () =>
      fetch(`${URL}/${id}`, { credentials: "include" }).then((res) => {
        if (authErrorHandler(res.status)) {
          return;
        }
        return res.json();
      }),
  });

  useEffect(() => {
    if (error || (data && !data.success)) {
      toast.error(
        "An error occurred while trying to retrieve data from the server.",
      );
    }
  }, [error, data]);

  useEffect(() => {
    const handleBoard = (data: { boardId?: string }) => {
      if (!data.boardId || data.boardId === id) {
        refetch();
      }
    };

    socket.on("board", handleBoard);
    socket.emit("joinBoard", id);

    return () => {
      socket.off("board", handleBoard);
      socket.emit("leaveBoard", id);
    };
  }, [id, refetch]);

  if (isPending) {
    return <LoaderComponent />;
  }

  return (
    <div className="bg-background h-full flex flex-col">
      <BoardHeaderComponent title={data.board.name} />
      <main className="flex-1 overflow-y-scroll pb-4 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
        <BoardComponent board={data.board} />
      </main>
    </div>
  );
}

export default BoardDetailPage;
