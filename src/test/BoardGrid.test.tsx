import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider, createStore } from "jotai";
import type { Board } from "../interfaces/board.interface";
import BoardGridComponent from "../components/BoardGrid";

vi.mock("../components/ModalBoard", () => ({
  default: () => <div data-testid="modal-board" />,
}));

function renderWithJotai(ui: React.ReactElement) {
  return render(<Provider>{ui}</Provider>);
}

describe("BoardGridComponent", () => {
  const boards: Board[] = [
    {
      id: "b1",
      name: "Board One",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "b2",
      name: "Board Two",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  test("renders each board name", () => {
    renderWithJotai(<BoardGridComponent boards={boards} />);
    expect(screen.getByText("Board One")).toBeInTheDocument();
    expect(screen.getByText("Board Two")).toBeInTheDocument();
  });

  test("renders Add Board card", () => {
    renderWithJotai(<BoardGridComponent boards={boards} />);
    expect(screen.getByText("Create Board")).toBeInTheDocument();
  });

  test("renders modal board component", () => {
    renderWithJotai(<BoardGridComponent boards={boards} />);
    expect(screen.getByTestId("modal-board")).toBeInTheDocument();
  });

  test("renders empty section when boards undefined", () => {
    const { container } = renderWithJotai(<BoardGridComponent boards={undefined} />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(screen.getByText("Create Board")).toBeInTheDocument();
  });
});
