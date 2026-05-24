import { Trello } from "lucide-react";
import UserMenu from "./UserMenu";

interface Props {
  title: string;
}

function BoardHeaderComponent({ title }: Props) {
  return (
    <header className="flex justify-between items-center p-4 border-b border-border">
      <h1 className="flex gap-2 items-center">
        <Trello />
        {title}
      </h1>
      <div className="flex gap-4 items-center">
        <a
          href="/"
          className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Home
        </a>
        <UserMenu />
      </div>
    </header>
  );
}

export default BoardHeaderComponent;
