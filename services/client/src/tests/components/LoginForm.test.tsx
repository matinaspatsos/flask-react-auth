import { render, screen } from "../test-utils";
import { describe, it, expect, vi } from "vitest";
import LoginForm from "../../components/LoginForm";

describe("LoginForm", () => {
  const mockOnSubmit = vi.fn();
  const props = {
    onSubmit: mockOnSubmit,
  };

  it("renders properly", () => {
    render(<LoginForm {...props} />);
    const heading = screen.getByRole("heading", { name: "Log In" });
    expect(heading.tagName.toLowerCase()).toBe("h1");
  });

  it("renders with default props", () => {
    render(<LoginForm {...props} />);

    const emailInput = screen.getByLabelText("Email") as HTMLInputElement;
    expect(emailInput.type).toBe("email");
    expect(emailInput.value).toBe("");

    const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;
    expect(passwordInput.type).toBe("password");
    expect(passwordInput.value).toBe("");

    const submitButtons = screen.getAllByRole("button", { name: "Log In" });
    expect(submitButtons[0].textContent).toBe("Log In");
  });

  it("renders", () => {
    const { asFragment } = render(<LoginForm {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
