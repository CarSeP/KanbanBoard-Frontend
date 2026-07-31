import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider, createStore } from "jotai";
import { modalAtom, modalDataAtom } from "../atoms/modal";
import type { Board } from "../interfaces/board.interface";
import BoardCardComponent from "../components/BoardCard";

function renderWithJotai(ui: React.ReactElement, store = createStore()) {
  return {
    store,
    ...render(<Provider store={store}>{ui}</Provider>),
  };
}

describe("BoardCardComponent", () => {
  const board: Board = {
    id: "board-1",
    name: "My Test Board",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  test("renders board name", () => {
    renderWithJotai(<BoardCardComponent board={board} />);
    expect(screen.getByText("My Test Board")).toBeInTheDocument();
  });

  test("renders a link to the board", () => {
    renderWithJotai(<BoardCardComponent board={board} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/board/board-1");
  });

  test("opens dropdown menu on button click", async () => {
    renderWithJotai(<BoardCardComponent board={board} />);
    const menuButton = screen.getByLabelText("Open menu");
    expect(menuButton).toBeInTheDocument();
  });

  test("sets modal to detail when Info is clicked", async () => {
    const store = createStore();
    renderWithJotai(<BoardCardComponent board={board} />, store);

    await userEvent.click(screen.getByLabelText("Open menu"));
    await userEvent.click(screen.getByText("Info"));

    expect(store.get(modalAtom)).toBe("detail");
    expect(store.get(modalDataAtom)).toEqual(board);
  });

  test("sets modal to upsert when Edit Board is clicked", async () => {
    const store = createStore();
    renderWithJotai(<BoardCardComponent board={board} />, store);

    await userEvent.click(screen.getByLabelText("Open menu"));
    await userEvent.click(screen.getByText("Edit Board"));

    expect(store.get(modalAtom)).toBe("upsert");
    expect(store.get(modalDataAtom)).toEqual(board);
  });

  test("sets modal to delete when Delete Board is clicked", async () => {
    const store = createStore();
    renderWithJotai(<BoardCardComponent board={board} />, store);

    await userEvent.click(screen.getByLabelText("Open menu"));
    await userEvent.click(screen.getByText("Delete Board"));

    expect(store.get(modalAtom)).toBe("delete");
    expect(store.get(modalDataAtom)).toEqual(board);
  });
});
