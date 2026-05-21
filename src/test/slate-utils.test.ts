import { describe, expect, test } from "vitest";
import { serialize, deserialize, toPlainText } from "../lib/slate-utils";

describe("serialize", () => {
  test("converts Descendant array to JSON string", () => {
    const nodes = [{ type: "paragraph" as const, children: [{ text: "Hello" }] }];
    const result = serialize(nodes);
    expect(result).toBe('[{"type":"paragraph","children":[{"text":"Hello"}]}]');
  });

  test("converts empty paragraph to JSON string", () => {
    const nodes = [{ type: "paragraph" as const, children: [{ text: "" }] }];
    const result = serialize(nodes);
    expect(result).toBe('[{"type":"paragraph","children":[{"text":""}]}]');
  });
});

describe("deserialize", () => {
  test("returns parsed nodes for valid JSON", () => {
    const json = '[{"type":"paragraph","children":[{"text":"Hello"}]}]';
    const result = deserialize(json);
    expect(result).toEqual([{ type: "paragraph", children: [{ text: "Hello" }] }]);
  });

  test("returns default content for empty string", () => {
    const result = deserialize("");
    expect(result).toEqual([{ type: "paragraph", children: [{ text: "" }] }]);
  });

  test("returns default content for invalid JSON", () => {
    const result = deserialize("not valid json");
    expect(result).toEqual([{ type: "paragraph", children: [{ text: "not valid json" }] }]);
  });

  test("returns default content for empty array JSON", () => {
    const result = deserialize("[]");
    expect(result).toEqual([{ type: "paragraph", children: [{ text: "" }] }]);
  });

  test("splits plain text into paragraphs by newline", () => {
    const result = deserialize("line one\nline two");
    expect(result).toEqual([
      { type: "paragraph", children: [{ text: "line one" }] },
      { type: "paragraph", children: [{ text: "line two" }] },
    ]);
  });
});

describe("toPlainText", () => {
  test("extracts plain text from nodes", () => {
    const nodes = [
      { type: "paragraph" as const, children: [{ text: "Hello world" }] },
    ];
    expect(toPlainText(nodes)).toBe("Hello world");
  });

  test("joins multiple nodes with space", () => {
    const nodes = [
      { type: "paragraph" as const, children: [{ text: "First" }] },
      { type: "paragraph" as const, children: [{ text: "Second" }] },
    ];
    expect(toPlainText(nodes)).toBe("First Second");
  });

  test("filters out empty text nodes", () => {
    const nodes = [
      { type: "paragraph" as const, children: [{ text: "" }] },
      { type: "paragraph" as const, children: [{ text: "Content" }] },
    ];
    expect(toPlainText(nodes)).toBe("Content");
  });
});
