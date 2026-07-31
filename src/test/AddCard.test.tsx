import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider, createStore } from "jotai";
import { actionAtom, actionDataAtom } from "../atoms/boardAction";
import AddCardComponent from "../components/AddCard";

function renderWithJotai(ui: React.ReactElement, store = createStore()) {
  return {
    store,
    ...render(<Provider store={store}>{ui}</Provider>),
  };
}

describe("AddCardComponent", () => {
  test("renders a button", () => {
    const { container } = renderWithJotai(
      <AddCardComponent order={0} columnId={1} boardId="board-1" />,
    );
    expect(container.querySelector("button")).toBeInTheDocument();
  });

  test("sets action atom to upsertCard on click", async () => {
    const store = createStore();
    renderWithJotai(
      <AddCardComponent order={3} columnId={5} boardId="board-abc" />,
      store,
    );

    await userEvent.click(screen.getByRole("button"));

    expect(store.get(actionAtom)).toBe("upsertCard");
    expect(store.get(actionDataAtom)).toEqual({
      order: 3,
      parentId: 5,
      boardId: "board-abc",
    });
  });
});
