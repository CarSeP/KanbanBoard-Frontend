import type { Board } from "../interfaces/board.interface";
import BoardCardComponent from "./BoardCard";
import AddBoardComponent from "./AddBoard";
import BoardDetail from "./BoardDetail";
import { useState } from "react";
import DeleteBoardComponent from "./DeleteBoard";
interface Props {
  boards: Board[];
}

function BoardGridComponent({ boards }: Props) {
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState<Board | undefined>();

  const onOpenModal = (board: Board, modal: string) => {
    setSelectedBoard(board);

    if (modal === "detail") {
      setDetailModalOpen(true);
      return;
    }

    if (modal === "delete") {
      setDeleteModalOpen(true);
      return;
    }
  };

  return (
    <section className="flex flex-wrap h-full overflow-y-scroll">
      {boards &&
        boards.map((board: Board) => (
          <BoardCardComponent
            key={board.id}
            board={board}
            openModal={onOpenModal}
          />
        ))}
      <AddBoardComponent />
      <BoardDetail
        open={detailModalOpen}
        onClose={() => {
          setDetailModalOpen(false);
        }}
        board={selectedBoard}
      />
      <DeleteBoardComponent
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
        }}
        board={selectedBoard}
      />
    </section>
  );
}

export default BoardGridComponent;
