import BoardGridComponent from "../components/BoardGrid";
import { toast } from "sonner";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { socket } from "../lib/socket";
import LoaderComponent from "../components/Loader";
import { authErrorHandler } from "@/lib/auth";
import UserMenu from "../components/UserMenu";
import { Trello } from "lucide-react";

const URL = import.meta.env.VITE_BACKEND_API_URL + "/board";

function HomePage() {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["getBoards"],
    queryFn: () =>
      fetch(URL, {
        credentials: "include",
        method: "GET",
      }).then((res) => {
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
    const handleBoard = () => {
      refetch();
    };

    socket.on("board", handleBoard);

    return () => {
      socket.off("board", handleBoard);
    };
  }, [refetch]);

  if (isPending) {
    return <LoaderComponent />;
  }

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <header className="flex justify-between items-center p-4 border-b border-border">
        <h1 className="flex gap-2 items-center text-xl font-semibold">
          <Trello />
          Kanban Board
        </h1>
        <div className="flex gap-4 items-center">
          <UserMenu />
        </div>
      </header>
      <main className="flex-1">
        <BoardGridComponent boards={data?.boards} />
      </main>
    </div>
  );
}

export default HomePage;
