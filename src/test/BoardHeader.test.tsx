import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BoardHeaderComponent from "../components/BoardHeader";

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe("BoardHeaderComponent", () => {
  test("renders the board title", () => {
    renderWithRouter(<BoardHeaderComponent title="My Board" />);
    expect(screen.getByText("My Board")).toBeInTheDocument();
  });

  test("renders a link to home", () => {
    renderWithRouter(<BoardHeaderComponent title="Test" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/");
  });
});
