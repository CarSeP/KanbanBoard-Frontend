import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import BoardDetailComponent from "../components/BoardDetail";
import type { Board } from "../interfaces/board.interface";
import { Dialog, DialogContent } from "../components/ui/dialog";

function renderWithDialog(ui: React.ReactElement) {
  return render(
    <Dialog open={true}>
      <DialogContent>{ui}</DialogContent>
    </Dialog>,
  );
}

describe("BoardDetailComponent", () => {
  const board: Board = {
    id: "board-123",
    name: "Test Board",
    createdAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-03-20"),
  };

  test("renders board information title", () => {
    renderWithDialog(<BoardDetailComponent onClose={vi.fn()} board={board} />);
    expect(screen.getByText("Board Information")).toBeInTheDocument();
  });

  test("renders board name", () => {
    renderWithDialog(<BoardDetailComponent onClose={vi.fn()} board={board} />);
    expect(screen.getByText("Test Board")).toBeInTheDocument();
  });

  test("renders board id", () => {
    renderWithDialog(<BoardDetailComponent onClose={vi.fn()} board={board} />);
    expect(screen.getByText("board-123")).toBeInTheDocument();
  });

  test("renders Close button", () => {
    renderWithDialog(<BoardDetailComponent onClose={vi.fn()} board={board} />);
    const buttons = screen.getAllByText("Close");
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });

  test("does not render board details when board is undefined", () => {
    renderWithDialog(<BoardDetailComponent onClose={vi.fn()} board={undefined} />);
    expect(screen.queryByText("board-123")).not.toBeInTheDocument();
  });
});
