import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider, createStore } from "jotai";
import { modalAtom, modalDataAtom } from "../atoms/modal";
import AddBoardCardComponent from "../components/AddBoardCard";

function renderWithJotai(ui: React.ReactElement, store = createStore()) {
  return {
    store,
    ...render(<Provider store={store}>{ui}</Provider>),
  };
}

describe("AddBoardCardComponent", () => {
  test("renders button with Create Board text", () => {
    renderWithJotai(<AddBoardCardComponent />);
    expect(screen.getByText("Create Board")).toBeInTheDocument();
  });

  test("sets modal atom to upsert on click", async () => {
    const store = createStore();
    renderWithJotai(<AddBoardCardComponent />, store);

    await userEvent.click(screen.getByText("Create Board"));

    expect(store.get(modalAtom)).toBe("upsert");
    expect(store.get(modalDataAtom)).toBeUndefined();
  });
});
