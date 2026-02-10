import { Trello } from "lucide-react";

interface Props {
  title: string;
}

function BoardHeaderComponent({ title }: Props) {
  return (
    <header className="flex justify-between p-4 border-b border-border">
      <h1 className="flex gap-2">
        <Trello />
        {title}
      </h1>
      <a href="/" className="flex">
        Home
      </a>
    </header>
  );
}

export default BoardHeaderComponent;
