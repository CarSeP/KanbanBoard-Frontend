import type { Board } from "../interfaces/board.interface";
import AddColumnComponent from "./AddColumn";
import BoardHeaderComponent from "./BoardHeader";
import ColunmComponent from "./Column";

interface Props {
  board: Board;
}

function BoardComponent({ board }: Props) {
  return (
    <section className="bg-background">
      <BoardHeaderComponent title={board.name} />
      <div className="mt-6 px-4 flex gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-4 lg:overflow-visible">
        {board.columns &&
          board.columns.map((column) => (
            <ColunmComponent column={column} key={column.id} />
          ))}
        <AddColumnComponent
          order={board.columns?.length ?? 0}
          boardId={board.id}
        />
      </div>
    </section>
  );
}

export default BoardComponent;
