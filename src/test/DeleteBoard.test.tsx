import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { Board } from "../interfaces/board.interface";
import DeleteBoardComponent from "../components/DeleteBoard";
import { Dialog, DialogContent } from "../components/ui/dialog";

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <Dialog open={true}>
        <DialogContent>{ui}</DialogContent>
      </Dialog>
    </QueryClientProvider>,
  );
}

describe("DeleteBoardComponent", () => {
  const board: Board = {
    id: "board-1",
    name: "Test Board",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  test("renders confirmation message", () => {
    renderWithProviders(<DeleteBoardComponent onClose={vi.fn()} board={board} />);
    expect(
      screen.getByText("Are you sure you want to delete this board?"),
    ).toBeInTheDocument();
  });

  test("renders Cancel button", () => {
    renderWithProviders(<DeleteBoardComponent onClose={vi.fn()} board={board} />);
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  test("renders Delete button", () => {
    renderWithProviders(<DeleteBoardComponent onClose={vi.fn()} board={board} />);
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });
});
