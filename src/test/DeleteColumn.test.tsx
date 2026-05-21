import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { Column } from "../interfaces/column.interface";
import type { ActionValue } from "../interfaces/action.interface";
import DeleteColumnComponent from "../components/DeleteColumn";
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

describe("DeleteColumnComponent", () => {
  const column: Column = {
    id: 1,
    title: "To Do",
    order: 0,
    boardId: "board-1",
    cards: [],
  };

  const value: ActionValue = {
    column,
    boardId: "board-1",
  };

  test("renders confirmation message", () => {
    renderWithProviders(<DeleteColumnComponent onClose={vi.fn()} value={value} />);
    expect(
      screen.getByText("Are you sure you want to delete this column?"),
    ).toBeInTheDocument();
  });

  test("renders Cancel button", () => {
    renderWithProviders(<DeleteColumnComponent onClose={vi.fn()} value={value} />);
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  test("renders Delete button", () => {
    renderWithProviders(<DeleteColumnComponent onClose={vi.fn()} value={value} />);
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });
});
