import { expect, test, describe, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { Login } from "@components/index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("Login", () => {
  const setup = () => {
    const queryClient = new QueryClient();
    const utils = render(
      <QueryClientProvider client={queryClient}>
        <Login setIsAuth={vi.fn()} />
      </QueryClientProvider>,
    );

    const main = screen.queryByTestId("login");
    const inputUsername = screen.getByTestId("login-username");
    const inputPassword = screen.getByTestId("login-password");
    const submit = screen.getByTestId("login-submit");

    return {
      main,
      inputUsername,
      inputPassword,
      submit,
      ...utils,
    };
  };

  test("Is present in DOM", () => {
    const { main } = setup();
    expect(main).toBeInTheDocument();
  });

  test("Form validation", async () => {
    const { inputUsername, inputPassword, submit, findByTestId, findByText } =
      setup();

    // Click submit
    fireEvent.click(submit);
    // Then
    const submitClicked = await findByTestId("login-submit");
    const errorUsername = await findByText("Compte requis");
    const errorPassword = await findByText("Mot de passe requis");
    expect(errorUsername).toBeInTheDocument();
    expect(errorPassword).toBeInTheDocument();
    expect(submitClicked).toBeDisabled();

    // Fill form
    fireEvent.change(inputUsername, { target: { value: "username" } });
    fireEvent.change(inputPassword, { target: { value: "password" } });
    // Then
    const submitFilled = await findByTestId("login-submit");
    expect(submitFilled).not.toBeDisabled();
    expect(errorUsername).not.toBeInTheDocument();
    expect(errorPassword).not.toBeInTheDocument();
  });
});
