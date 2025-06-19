import { render, cleanup } from "../test-utils";
import { it, expect, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

import About from "../../components/About";

afterEach(cleanup);

it("renders", () => {
  const { asFragment } = render(<About />);
  expect(asFragment()).toMatchSnapshot();
});

it("renders properly", () => {
  const { getByText } = render(<About />);
  expect(getByText("Add something relevant here.")).toHaveClass("content");
});
