import { useEffect } from "react";
import type { Board } from "../interfaces/board.interface";
import BoardHeaderComponent from "./BoardHeader";
import ColunmComponent from "./Column";

interface Props {
  board: Board;
}

function BoardComponent({ board }: Props) {
  return (
    <section>
      <BoardHeaderComponent title={board.name} />
      <div className="flex gap-4 p-4">
        {board.columns &&
          board.columns.map((column) => (
            <ColunmComponent column={column} key={column.id} />
          ))}
      </div>
    </section>
  );
}

export default BoardComponent;
