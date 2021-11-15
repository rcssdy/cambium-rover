import React from "react";
import { cleanup, render } from "@testing-library/react";
import Plateau from "../components/Plateau";
import userEvent from "@testing-library/user-event";

describe("<Plateau />", () => {
  afterEach(() => {
    cleanup();
  });

  it('moves rover forward when "Move Forward" button is clicked', () => {
    const handleSubmit = jest.fn();
    const boundaries = { x: 10, y: 10 };
    const rovers = [{ posX: 0, posY: 0, direction: "N" }];
    const { getByText } = render(
      <Plateau
        boundaries={boundaries}
        rovers={rovers}
        onSubmit={handleSubmit}
      />
    );

    userEvent.click(getByText(/Move Forward/i));

    expect(rovers[0].posY).toEqual(1);
  });

  it("can accept and perform custom movements", () => {
    const handleSubmit = jest.fn();
    const boundaries = { x: 10, y: 10 };
    const rovers = [{ posX: 1, posY: 2, direction: "N" }];
    const movements = "LMLMLMLMM";
    const { getByLabelText, getByText } = render(
      <Plateau
        boundaries={boundaries}
        rovers={rovers}
        onSubmit={handleSubmit}
      />
    );

    userEvent.type(getByLabelText(/Custom Movements/i), movements);
    userEvent.click(getByText(/Move Rover/i));

    expect(rovers[0].posX).toEqual(1);
    expect(rovers[0].posY).toEqual(3);
    expect(handleSubmit).toHaveBeenCalledTimes(movements.length);
  });
});
