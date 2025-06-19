import { render, screen, cleanup } from "../test-utils";
import { describe, it, expect, vi, afterEach } from "vitest";
import RegisterForm from "../../components/RegisterForm";

describe("RegisterForm", () => {
  afterEach(() => {
    cleanup();
  });
  const mockOnSubmit = vi.fn();
  const props = {
    onSubmit: mockOnSubmit,
  };

  it("renders properly", () => {
    render(<RegisterForm {...props} />);
    const heading = screen.getByRole("heading", { name: "Register" });
    expect(heading.tagName.toLowerCase()).toBe("h1");
  });

  it("renders with default props", () => {
    render(<RegisterForm {...props} />);

    const usernameInput = screen.getByLabelText("Username") as HTMLInputElement;
    expect(usernameInput.value).toBe("");

    const emailInput = screen.getByLabelText("Email") as HTMLInputElement;
    expect(emailInput.type).toBe("email");
    expect(emailInput.value).toBe("");

    const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;
    expect(passwordInput.type).toBe("password");
    expect(passwordInput.value).toBe("");

    const submitButtons = screen.getAllByRole("button", { name: "Register" });
    expect(submitButtons[0].textContent).toBe("Register");
  });

  it("renders", () => {
    const { asFragment } = render(<RegisterForm {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
