import { useQuery } from "@tanstack/react-query";
import LoaderComponent from "../components/Loader";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import { socket } from "../lib/socket";
import BoardComponent from "../components/Board";

const URL = import.meta.env.VITE_BACKEND_API_URL + "/board";

function BoardDetailPage() {
  const params = useParams();
  const id = params.id;

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["getBoard"],
    queryFn: () => fetch(`${URL}/${id}`).then((res) => res.json()),
  });

  useEffect(() => {
    if (error || (data && !data.success)) {
      toast.error(
        "An error occurred while trying to retrieve data from the server.",
      );
    }
  }, [error, data]);

  socket.on("board", () => {
    refetch();
  });

  if (isPending) {
    return <LoaderComponent />;
  }

  return (
    <main>
      <BoardComponent board={data.board} />
    </main>
  );
}

export default BoardDetailPage;
