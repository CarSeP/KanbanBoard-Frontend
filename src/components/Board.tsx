import type { Board } from "../interfaces/board.interface";
import AddColumnComponent from "./AddColumn";
import ColunmComponent from "./Column";
import ModalActionComponent from "./ModalAction";

interface Props {
  board: Board;
}

function BoardComponent({ board }: Props) {
  return (
    <section className="flex flex-col h-full">
      <header className="flex justify-end pt-4 shrink-0">
        <AddColumnComponent
          order={board.columns?.length ?? 0}
          boardId={board.id}
        />
      </header>
      <div className="mt-6 px-4 flex gap-4 overflow-x-auto flex-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
        {board.columns &&
          board.columns.map((column) => (
            <ColunmComponent column={column} key={column.id} />
          ))}
      </div>
      <ModalActionComponent />
    </section>
  );
}

export default BoardComponent;
