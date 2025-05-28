import { render, screen, fireEvent } from "@testing-library/react";
import Signin from "../pages/Auth/Signin/index";
import Signup from "../pages/Auth/Signup/index";
import Products from "../pages/Products/index";

describe("Frontend UI/UX", () => {
  test("Sign In button disabled when form invalid", () => {
    render(<Signin />);
    const button = screen.getByRole("button", { name: /sign in/i });
    expect(button).toBeDisabled();
  });

  test("Sign In button enabled when form valid", () => {
    render(<Signin />);
    fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: "test@mail.com" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "123456" } });
    const button = screen.getByRole("button", { name: /sign in/i });
    expect(button).not.toBeDisabled();
  });

  test("Signup button enabled when form valid", () => {
    render(<Signup />);
    fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: "test@mail.com" } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: "123456" } });
    fireEvent.change(screen.getByLabelText(/password confirm/i), { target: { value: "123456" } });
    const button = screen.getByRole("button", { name: /sign up/i });
    expect(button).not.toBeDisabled();
  });

  test("Products page renders", () => {
    render(<Products />);
    expect(screen.getByText(/products/i)).toBeInTheDocument();
  });
});
