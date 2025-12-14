import BoardGridComponent from "../components/BoardGrid";
import { toast } from "sonner";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { socket } from "../lib/socket";
import LoaderComponent from "../components/Loader";

const URL = import.meta.env.VITE_BACKEND_API_URL + "/board";

function HomePage() {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["getBoards"],
    queryFn: () => fetch(URL).then((res) => res.json()),
  });

  useEffect(() => {
    if (error || (data && !data.success)) {
      toast.error(
        "An error occurred while trying to retrieve data from the server."
      );
    }
  }, [error, data]);

  socket.on("board", () => {
    refetch();
  });

  if (isPending) {
    return <LoaderComponent />;
  }

  return <BoardGridComponent boards={data.boards} />;
}

export default HomePage;
