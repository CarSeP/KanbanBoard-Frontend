import { describe, expect, test} from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider, createStore } from "jotai";
import { modalAtom, modalDataAtom } from "../atoms/modal";
import type { Board } from "../interfaces/board.interface";
import ModalBoardComponent from "../components/ModalBoard";

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

describe("ModalBoardComponent", () => {
  const board: Board = {
    id: "board-1",
    name: "Test Board",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  test("does not render dialog when state is none", () => {
    const { container } = renderWithProviders(<ModalBoardComponent />);
    expect(container.querySelector('[role="dialog"]')).not.toBeInTheDocument();
  });

  test("renders delete confirmation when modal is delete", () => {
    const store = createStore();
    store.set(modalAtom, "delete");
    store.set(modalDataAtom, board);

    renderWithProviders(<ModalBoardComponent />, store);
    expect(
      screen.getByText("Are you sure you want to delete this board?"),
    ).toBeInTheDocument();
  });

  test("renders upsert form when modal is upsert", () => {
    const store = createStore();
    store.set(modalAtom, "upsert");
    store.set(modalDataAtom, board);

    renderWithProviders(<ModalBoardComponent />, store);
    expect(screen.getByText("Update Board")).toBeInTheDocument();
  });

  test("renders invite form when modal is invite", () => {
    const store = createStore();
    store.set(modalAtom, "invite");
    store.set(modalDataAtom, board);

    renderWithProviders(<ModalBoardComponent />, store);
    expect(screen.getByText("Board Invitations")).toBeInTheDocument();
  });

  test("renders detail info when modal is detail", () => {
    const store = createStore();
    store.set(modalAtom, "detail");
    store.set(modalDataAtom, board);

    renderWithProviders(<ModalBoardComponent />, store);
    expect(screen.getByText("Board Information")).toBeInTheDocument();
  });
});
