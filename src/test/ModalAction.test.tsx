import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider, createStore } from "jotai";
import { actionAtom, actionDataAtom } from "../atoms/boardAction";
import type { Card } from "../interfaces/card.interface";
import type { Column } from "../interfaces/column.interface";
import ModalActionComponent from "../components/ModalAction";

vi.mock("../components/RichTextEditor", () => ({
  default: ({ value }: { value: string }) => (
    <div data-testid="rich-text-editor">{value}</div>
  ),
}));

function renderWithProviders(ui: React.ReactElement, store = createStore()) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return {
    store,
    ...render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>{ui}</Provider>
      </QueryClientProvider>,
    ),
  };
}

describe("ModalActionComponent", () => {
  const card: Card = {
    id: 1,
    title: "Card Title",
    order: 0,
    content: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    columnId: 1,
  };

  const column: Column = {
    id: 1,
    title: "Col",
    order: 0,
    boardId: "b1",
    cards: [],
  };

  test("does not render dialog when state is none", () => {
    const { container } = renderWithProviders(<ModalActionComponent />);
    expect(container.querySelector('[role="dialog"]')).not.toBeInTheDocument();
  });

  test("renders upsertColumn modal", () => {
    const store = createStore();
    store.set(actionAtom, "upsertColumn");
    store.set(actionDataAtom, { column, boardId: "b1" });

    renderWithProviders(<ModalActionComponent />, store);
    expect(screen.getByText("Update Column")).toBeInTheDocument();
  });

  test("renders deleteColumn modal", () => {
    const store = createStore();
    store.set(actionAtom, "deleteColumn");
    store.set(actionDataAtom, { column, boardId: "b1" });

    renderWithProviders(<ModalActionComponent />, store);
    expect(
      screen.getByText("Are you sure you want to delete this column?"),
    ).toBeInTheDocument();
  });

  test("renders upsertCard modal", () => {
    const store = createStore();
    store.set(actionAtom, "upsertCard");
    store.set(actionDataAtom, { card, boardId: "b1" });

    renderWithProviders(<ModalActionComponent />, store);
    expect(screen.getByText("Update Card")).toBeInTheDocument();
  });

  test("renders deleteCard modal", () => {
    const store = createStore();
    store.set(actionAtom, "deleteCard");
    store.set(actionDataAtom, { card, boardId: "b1" });

    renderWithProviders(<ModalActionComponent />, store);
    expect(
      screen.getByText("Are you sure you want to delete this card?"),
    ).toBeInTheDocument();
  });

  test("renders detailCard modal", () => {
    const store = createStore();
    store.set(actionAtom, "detailCard");
    store.set(actionDataAtom, { card, boardId: "b1" });

    renderWithProviders(<ModalActionComponent />, store);
    expect(screen.getByText(card.title)).toBeInTheDocument();
  });
});
