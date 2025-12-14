import type { Card } from "../interfaces/card.interface";

interface Props {
  card: Card;
}

function CardComponent({ card }: Props) {
  return <button className="p-2 text-left rounded bg-input">{card.title}</button>;
}

export default CardComponent;
