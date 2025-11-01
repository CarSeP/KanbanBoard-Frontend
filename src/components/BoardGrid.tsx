import type { Board } from "../interfaces/board.interface";
import BoardCardComponent from "./BoardCard";
import AddBoardComponent from "./AddBoard";
import BoardDetail from "./BoardDetail";
import { useState } from "react";
interface Props {
  boards: Board[];
}

function BoardGridComponent({ boards }: Props) {
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState<Board | undefined>();

  const onOpenDetailModal = (board: Board) => {
    setSelectedBoard(board);
    setDetailModalOpen(true);
  };

  return (
    <section className="flex flex-wrap h-full overflow-y-scroll">
      {boards &&
        boards.map((board: Board) => (
          <BoardCardComponent
            key={board.id}
            board={board}
            openDetailModal={onOpenDetailModal}
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
    </section>
  );
}

export default BoardGridComponent;
