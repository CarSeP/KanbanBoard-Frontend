import { Card, CardTitle } from "./ui/card";

interface Props {
  openModal: (board: undefined, modal: string) => void;
}

function AddBoardCardComponent({ openModal }: Props) {
  return (
    <div
      className="w-96 h-46 p-6 flex justify-center"
      onClick={() => {
        openModal(undefined, "upsert");
      }}
    >
      <Card className="flex items-center justify-center w-full max-w-sm cursor-pointer border-dashed hover:bg-accent">
        <CardTitle className="text-2xl text-muted-foreground">
          Create Board
        </CardTitle>
      </Card>
    </div>
  );
}

export default AddBoardCardComponent;
