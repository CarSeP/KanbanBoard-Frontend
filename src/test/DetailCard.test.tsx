import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider, createStore } from "jotai";
import { actionAtom, actionDataAtom } from "../atoms/boardAction";
import type { Card } from "../interfaces/card.interface";
import type { ActionValue } from "../interfaces/action.interface";
import DetailCardComponent from "../components/DetailCard";
import { Dialog, DialogContent } from "../components/ui/dialog";

vi.mock("../components/RichTextEditor", () => ({
  default: ({ value, readOnly }: { value: string; readOnly?: boolean }) => (
    <div data-testid="rich-text-editor" data-readonly={readOnly}>
      {value ? JSON.parse(value)[0]?.children[0]?.text ?? "" : ""}
    </div>
  ),
}));

function renderWithProviders(ui: React.ReactElement, store = createStore()) {
  return {
    store,
    ...render(
      <Provider store={store}>
        <Dialog open={true}>
          <DialogContent>{ui}</DialogContent>
        </Dialog>
      </Provider>,
    ),
  };
}

describe("DetailCardComponent", () => {
  const card: Card = {
    id: 100,
    title: "My Card Title",
    order: 0,
    content: '[{"type":"paragraph","children":[{"text":"Card description"}]}]',
    createdAt: new Date("2025-01-15T10:00:00"),
    updatedAt: new Date("2025-02-10T14:30:00"),
    columnId: 1,
  };

  const value: ActionValue = {
    card,
    boardId: "board-1",
  };

  test("renders card title", () => {
    renderWithProviders(<DetailCardComponent onClose={vi.fn()} value={value} />);
    expect(screen.getByText("My Card Title")).toBeInTheDocument();
  });

  test("renders Untitled Card when no title", () => {
    const cardNoTitle = { ...card, title: "" };
    renderWithProviders(
      <DetailCardComponent onClose={vi.fn()} value={{ ...value, card: cardNoTitle }} />,
    );
    expect(screen.getByText("Untitled Card")).toBeInTheDocument();
  });

  test("renders description section when card has content", () => {
    renderWithProviders(<DetailCardComponent onClose={vi.fn()} value={value} />);
    expect(screen.getByText("Description")).toBeInTheDocument();
    const editor = screen.getByTestId("rich-text-editor");
    expect(editor).toBeInTheDocument();
    expect(editor.dataset.readonly).toBe("true");
  });

  test("does not render description section when no content", () => {
    const cardNoContent = { ...card, content: "" };
    renderWithProviders(
      <DetailCardComponent onClose={vi.fn()} value={{ ...value, card: cardNoContent }} />,
    );
    expect(screen.queryByText("Description")).not.toBeInTheDocument();
  });

  test("renders Edit button", () => {
    renderWithProviders(<DetailCardComponent onClose={vi.fn()} value={value} />);
    expect(screen.getByText("Edit")).toBeInTheDocument();
  });

  test("renders Delete button", () => {
    renderWithProviders(<DetailCardComponent onClose={vi.fn()} value={value} />);
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  test("renders Cancel button", () => {
    renderWithProviders(<DetailCardComponent onClose={vi.fn()} value={value} />);
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  test("clicking Cancel calls onClose", async () => {
    const onClose = vi.fn();
    renderWithProviders(<DetailCardComponent onClose={onClose} value={value} />);
    await userEvent.click(screen.getByText("Cancel"));
    expect(onClose).toHaveBeenCalledOnce();
  });

  test("clicking Edit sets action to upsertCard", async () => {
    const store = createStore();
    renderWithProviders(<DetailCardComponent onClose={vi.fn()} value={value} />, store);

    await userEvent.click(screen.getByText("Edit"));

    expect(store.get(actionAtom)).toBe("upsertCard");
    expect(store.get(actionDataAtom)).toEqual({ card, boardId: "board-1" });
  });

  test("clicking Delete sets action to deleteCard", async () => {
    const store = createStore();
    renderWithProviders(<DetailCardComponent onClose={vi.fn()} value={value} />, store);

    await userEvent.click(screen.getByText("Delete"));

    expect(store.get(actionAtom)).toBe("deleteCard");
    expect(store.get(actionDataAtom)?.card).toEqual(card);
    expect(store.get(actionDataAtom)?.boardId).toBe("board-1");
  });

  test("renders created and updated timestamps", () => {
    renderWithProviders(<DetailCardComponent onClose={vi.fn()} value={value} />);
    expect(screen.getByText(/Created/)).toBeInTheDocument();
    expect(screen.getByText(/Updated/)).toBeInTheDocument();
  });
});
