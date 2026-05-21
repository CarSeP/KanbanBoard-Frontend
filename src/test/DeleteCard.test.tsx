import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider, createStore } from "jotai";
import type { Card } from "../interfaces/card.interface";
import type { ActionValue } from "../interfaces/action.interface";
import DeleteCardComponent from "../components/DeleteCard";
import { Dialog, DialogContent } from "../components/ui/dialog";

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  const store = createStore();
  return {
    store,
    ...render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Dialog open={true}>
            <DialogContent>{ui}</DialogContent>
          </Dialog>
        </Provider>
      </QueryClientProvider>,
    ),
  };
}

describe("DeleteCardComponent", () => {
  const card: Card = {
    id: 10,
    title: "My Card",
    order: 0,
    content: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    columnId: 1,
  };

  const value: ActionValue = {
    card,
    boardId: "board-1",
  };

  test("renders confirmation message", () => {
    renderWithProviders(<DeleteCardComponent onClose={vi.fn()} value={value} />);
    expect(
      screen.getByText("Are you sure you want to delete this card?"),
    ).toBeInTheDocument();
  });

  test("renders Cancel button", () => {
    renderWithProviders(<DeleteCardComponent onClose={vi.fn()} value={value} />);
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  test("renders Delete button", () => {
    renderWithProviders(<DeleteCardComponent onClose={vi.fn()} value={value} />);
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });
});
