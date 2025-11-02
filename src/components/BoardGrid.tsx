import type { Board } from "../interfaces/board.interface";
import BoardCardComponent from "./BoardCard";
import AddBoardCardComponent from "./AddBoardCard";
import BoardDetail from "./BoardDetail";
import { useState } from "react";
import DeleteBoardComponent from "./DeleteBoard";
import UpsertBoardComponent from "./UpsertBoard";

interface Props {
  boards: Board[];
}

function BoardGridComponent({ boards }: Props) {
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [upsertModalOpen, setUpsertModalOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState<Board | undefined>();

  const onOpenModal = (board: Board | undefined, modal: string) => {
    setSelectedBoard(board);

    if (modal === "detail") {
      setDetailModalOpen(true);
      return;
    }

    if (modal === "delete") {
      setDeleteModalOpen(true);
      return;
    }

    if (modal == "upsert") {
      setUpsertModalOpen(true);
      return;
    }
  };

  return (
    <section className="flex flex-wrap overflow-y-scroll">
      {boards &&
        boards.map((board: Board) => (
          <BoardCardComponent
            key={board.id}
            board={board}
            openModal={onOpenModal}
          />
        ))}
      <AddBoardCardComponent openModal={onOpenModal} />
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
      <UpsertBoardComponent
        open={upsertModalOpen}
        onClose={() => {
          setUpsertModalOpen(false);
        }}
        board={selectedBoard}
      />
    </section>
  );
}

export default BoardGridComponent;
