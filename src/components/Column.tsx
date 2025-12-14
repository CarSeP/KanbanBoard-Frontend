import type { Column } from "../interfaces/column.interface";
import CardComponent from "./Card";

interface Props {
  column: Column;
}

function ColunmComponent({ column }: Props) {
  return (
    <article className="w-80 rounded p-4 bg-secondary">
      <header>
        <h2>{column.title}</h2>
      </header>
      <div className="flex flex-col gap-2 pt-4">
        {column.cards &&
          column.cards.map((card) => (
            <CardComponent card={card} key={card.id} />
          ))}
      </div>
    </article>
  );
}

export default ColunmComponent;
