import { describe, expect, test } from "vitest";
import { formatDate, formatTime } from "../lib/time";

describe("formatDate", () => {
  test("returns formatted date for a Date object", () => {
    const date = new Date("2025-03-15T10:30:00");
    const result = formatDate(date);
    expect(result).toBe("Mar 15, 2025");
  });

  test("returns formatted date for a string", () => {
    const result = formatDate("2025-12-01T08:00:00");
    expect(result).toBe("Dec 1, 2025");
  });

  test('returns "—" for undefined', () => {
    expect(formatDate(undefined)).toBe("—");
  });

  test('returns "—" for empty string', () => {
    expect(formatDate("")).toBe("—");
  });
});

describe("formatTime", () => {
  test("returns formatted time for a Date object", () => {
    const date = new Date("2025-03-15T10:30:00");
    const result = formatTime(date);
    expect(result).toMatch(/^\d{2}:\d{2} (AM|PM)$/);
  });

  test("returns formatted time for a string", () => {
    const result = formatTime("2025-12-01T23:45:00");
    expect(result).toMatch(/^\d{2}:\d{2} (AM|PM)$/);
  });

  test('returns "—" for undefined', () => {
    expect(formatTime(undefined)).toBe("—");
  });

  test('returns "—" for empty string', () => {
    expect(formatTime("")).toBe("—");
  });
});
