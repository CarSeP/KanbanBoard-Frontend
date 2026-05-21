import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CardComponent from "../components/Card";
import type { Card } from "../interfaces/card.interface";

vi.mock("../lib/slate-utils", () => ({
  deserialize: vi.fn((val: string) => {
    if (!val) return [{ type: "paragraph", children: [{ text: "" }] }];
    return JSON.parse(val);
  }),
  toPlainText: vi.fn((nodes) =>
    nodes.map((n: { children: { text: string }[] }) => n.children[0]?.text ?? "").join(" "),
  ),
}));

describe("CardComponent", () => {
  const baseCard: Card = {
    id: 1,
    title: "My Card",
    order: 0,
    content: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    columnId: 1,
  };

  test("renders card title", () => {
    render(<CardComponent card={baseCard} />);
    expect(screen.getByText("My Card")).toBeInTheDocument();
  });

  test("renders content preview when content exists", () => {
    const card: Card = {
      ...baseCard,
      content: '[{"type":"paragraph","children":[{"text":"Description text"}]}]',
    };
    render(<CardComponent card={card} />);
    expect(screen.getByText("Description text")).toBeInTheDocument();
  });

  test("does not render content paragraph when content is empty", () => {
    render(<CardComponent card={baseCard} />);
    const heading = screen.getByText("My Card");
    expect(heading.tagName).toBe("H4");
    const paragraphs = screen.queryAllByRole("paragraph");
    expect(paragraphs).toHaveLength(0);
  });

  test("renders with correct article element", () => {
    const { container } = render(<CardComponent card={baseCard} />);
    expect(container.querySelector("article")).toBeInTheDocument();
  });
});
