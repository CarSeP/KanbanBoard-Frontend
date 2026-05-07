import type { Board } from "../interfaces/board.interface";
import AddColumnComponent from "./AddColumn";
import ColunmComponent from "./Column";

interface Props {
  board: Board;
}

function BoardComponent({ board }: Props) {
  return (
    <section className="flex flex-col">
      <header className="flex justify-end pt-4">
        <AddColumnComponent
          order={board.columns?.length ?? 0}
          boardId={board.id}
        />
      </header>
      <div className="mt-6 px-4 flex gap-4">
        {board.columns &&
          board.columns.map((column) => (
            <ColunmComponent column={column} key={column.id} />
          ))}
      </div>
    </section>
  );
}

export default BoardComponent;
