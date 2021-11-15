import React from "react";
import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RoverForm from "../components/RoverForm";

describe("<RoverForm />", () => {
  afterEach(() => {
    cleanup();
  });

  it("calls onSubmit with xPos, yPos, and direction when submit is clicked", () => {
    const handleSubmit = jest.fn();
    const { getByLabelText, getByText } = render(
      <RoverForm onSubmit={handleSubmit} />
    );
    const rover = { posX: "3", posY: "3", direction: "N" };

    userEvent.type(getByLabelText(/X Position/i), rover.posX);
    userEvent.type(getByLabelText(/Y Position/i), rover.posY);
    userEvent.type(getByLabelText(/Direction/i), rover.direction);
    userEvent.click(getByText(/Add Rover/i));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith(rover);
  });

  it('shows an error message when no X position has been provided and "Add Rover" is clicked', () => {
    const handleSubmit = jest.fn();
    const { getByLabelText, getByText, getByRole } = render(
      <RoverForm onSubmit={handleSubmit} />
    );
    const rover = { posY: "3", direction: "N" };

    userEvent.type(getByLabelText(/Y Position/i), rover.posY);
    userEvent.type(getByLabelText(/Direction/i), rover.direction);
    userEvent.click(getByText(/Add Rover/i));

    const errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(
      /Both X and Y positions are required/i
    );
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('shows an error message when no Y position has been provided and "Add Rover" is clicked', () => {
    const handleSubmit = jest.fn();
    const { getByLabelText, getByText, getByRole } = render(
      <RoverForm onSubmit={handleSubmit} />
    );
    const rover = { posX: "3", direction: "E" };

    userEvent.type(getByLabelText(/X Position/i), rover.posX);
    userEvent.type(getByLabelText(/Direction/i), rover.direction);
    userEvent.click(getByText(/Add Rover/i));

    const errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(
      /Both X and Y positions are required/i
    );
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('shows an error message when invalid direction has been provided and "Add Rover" is clicked', () => {
    const handleSubmit = jest.fn();
    const { getByLabelText, getByText, getByRole } = render(
      <RoverForm onSubmit={handleSubmit} />
    );
    const rover = { posX: "3", posY: "3", direction: "A" };

    userEvent.type(getByLabelText(/X Position/i), rover.posX);
    userEvent.type(getByLabelText(/Y Position/i), rover.posY);
    userEvent.type(getByLabelText(/Direction/i), rover.direction);
    userEvent.click(getByText(/Add Rover/i));

    const errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(
      /A valid starting direction is required to orient the rover/i
    );
    expect(handleSubmit).not.toHaveBeenCalled();
  });
});
