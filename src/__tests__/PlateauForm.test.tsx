import React from "react";
import { cleanup, render } from "@testing-library/react";
import PlateauForm from "../components/PlateauForm";
import userEvent from "@testing-library/user-event";

describe("<PlateauForm />", () => {
  afterEach(() => {
    cleanup();
  });

  it("calls onSubmit with x, y when submit is clicked", () => {
    const handleSubmit = jest.fn();
    const { getByLabelText, getByText } = render(
      <PlateauForm onSubmit={handleSubmit} />
    );
    const plateau = { x: "3", y: "3" };

    userEvent.type(getByLabelText(/X Boundary/i), plateau.x);
    userEvent.type(getByLabelText(/Y Boundary/i), plateau.y);
    userEvent.click(getByText(/Generate/i));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith(plateau);
  });

  it('shows an error message when no X boundary has been provided and "Generate" has been clicked', () => {
    const handleSubmit = jest.fn();
    const { getByLabelText, getByText, getByRole } = render(
      <PlateauForm onSubmit={handleSubmit} />
    );
    const plateau = { y: "3" };

    userEvent.type(getByLabelText(/Y Boundary/i), plateau.y);
    userEvent.click(getByText(/Generate/i));

    const errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/Both X and Y values are required/i);
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('shows an error message when no Y boundary has been provided and "Generate" has been clicked', () => {
    const handleSubmit = jest.fn();
    const { getByLabelText, getByText, getByRole } = render(
      <PlateauForm onSubmit={handleSubmit} />
    );
    const plateau = { x: "3" };

    userEvent.type(getByLabelText(/X Boundary/i), plateau.x);
    userEvent.click(getByText(/Generate/i));

    const errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/Both X and Y values are required/i);
    expect(handleSubmit).not.toHaveBeenCalled();
  });
});
