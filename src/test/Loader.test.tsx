import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";
import LoaderComponent from "../components/Loader";

describe("LoaderComponent", () => {
  test("renders a loader icon", () => {
    const { container } = render(<LoaderComponent />);
    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  test("renders with fixed position", () => {
    const { container } = render(<LoaderComponent />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toContain("fixed");
  });

  test("renders centered content", () => {
    const { container } = render(<LoaderComponent />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toContain("flex");
    expect(wrapper.className).toContain("justify-center");
    expect(wrapper.className).toContain("items-center");
  });
});
