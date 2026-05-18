import type { Descendant } from "slate";
import { Node } from "slate";

const DEFAULT_CONTENT: Descendant[] = [
  { type: "paragraph", children: [{ text: "" }] },
];

export function serialize(nodes: Descendant[]): string {
  return JSON.stringify(nodes);
}

export function deserialize(value: string): Descendant[] {
  if (!value) return DEFAULT_CONTENT;

  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    return DEFAULT_CONTENT;
  } catch {
    return value
      .split("\n")
      .map((line) => ({
        type: "paragraph" as const,
        children: [{ text: line }],
      }));
  }
}

export function toPlainText(nodes: Descendant[]): string {
  return nodes
    .map((node) => Node.string(node))
    .filter((text) => text.length > 0)
    .join(" ");
}
