import type { Board } from "../interfaces/board.interface";
import BoardCardComponent from "./BoardCard";
import AddBoardCardComponent from "./AddBoardCard";
import ModalBoardComponent from "./ModalBoard";

interface Props {
  boards: Board[];
}

function BoardGridComponent({ boards }: Props) {
  return (
    <section className="flex flex-wrap overflow-y-scroll">
      {boards &&
        boards.map((board: Board) => (
          <BoardCardComponent key={board.id} board={board} />
        ))}
      <AddBoardCardComponent />
      <ModalBoardComponent />
    </section>
  );
}

export default BoardGridComponent;
