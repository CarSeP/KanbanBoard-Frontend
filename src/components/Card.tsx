import type { Card } from "../interfaces/card.interface";
import { deserialize, toPlainText } from "../lib/slate-utils";

interface Props {
  card: Card;
}

function CardComponent({ card }: Props) {
  return (
    <article className="group rounded-lg border border-border bg-card p-3.5 shadow-sm transition-shadow hover:shadow-md text-left">
      <h4 className="text-sm font-medium text-card-foreground leading-snug line-clamp-2 wrap-break-word">
        {card.title}
      </h4>
      {card.content && (
        <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {toPlainText(deserialize(card.content))}
        </p>
      )}
    </article>
  );
}

export default CardComponent;
