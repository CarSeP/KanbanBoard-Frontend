import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider, createStore } from "jotai";
import type { Column } from "../interfaces/column.interface";
import ColumnComponent from "../components/Column";

vi.mock("sortablejs", () => ({
  default: vi.fn(),
}));

vi.mock("../lib/slate-utils", () => ({
  deserialize: vi.fn(() => [{ type: "paragraph", children: [{ text: "" }] }]),
  toPlainText: vi.fn(() => ""),
}));

function renderWithJotai(ui: React.ReactElement, store = createStore()) {
  return {
    store,
    ...render(<Provider store={store}>{ui}</Provider>),
  };
}

describe("ColumnComponent", () => {
  const column: Column = {
    id: 1,
    title: "To Do",
    order: 0,
    boardId: "board-1",
    cards: [
      {
        id: 1,
        title: "Card One",
        order: 0,
        content: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        columnId: 1,
      },
      {
        id: 2,
        title: "Card Two",
        order: 1,
        content: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        columnId: 1,
      },
    ],
  };

  test("renders column title", () => {
    renderWithJotai(<ColumnComponent column={column} />);
    expect(screen.getByText("To Do")).toBeInTheDocument();
  });

  test("renders card count badge", () => {
    renderWithJotai(<ColumnComponent column={column} />);
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  test("renders each card title", () => {
    renderWithJotai(<ColumnComponent column={column} />);
    expect(screen.getByText("Card One")).toBeInTheDocument();
    expect(screen.getByText("Card Two")).toBeInTheDocument();
  });

  test("renders empty column correctly", () => {
    const emptyColumn: Column = {
      id: 2,
      title: "Empty",
      order: 0,
      boardId: "board-1",
      cards: [],
    };

    renderWithJotai(<ColumnComponent column={emptyColumn} />);
    expect(screen.getByText("Empty")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  test("renders menu button", () => {
    renderWithJotai(<ColumnComponent column={column} />);
    expect(screen.getByLabelText("Open menu")).toBeInTheDocument();
  });
});
