import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider, createStore } from "jotai";
import { actionAtom, actionDataAtom } from "../atoms/boardAction";
import AddColumnComponent from "../components/AddColumn";

function renderWithJotai(ui: React.ReactElement, store = createStore()) {
  return {
    store,
    ...render(<Provider store={store}>{ui}</Provider>),
  };
}

describe("AddColumnComponent", () => {
  test("renders button with Add new column text", () => {
    renderWithJotai(<AddColumnComponent order={0} boardId="board-1" />);
    expect(screen.getByText("Add new column")).toBeInTheDocument();
  });

  test("sets action atom to upsertColumn on click", async () => {
    const store = createStore();
    renderWithJotai(<AddColumnComponent order={2} boardId="board-xyz" />, store);

    await userEvent.click(screen.getByText("Add new column"));

    expect(store.get(actionAtom)).toBe("upsertColumn");
    expect(store.get(actionDataAtom)).toEqual({
      order: 2,
      parentId: "board-xyz",
    });
  });
});
