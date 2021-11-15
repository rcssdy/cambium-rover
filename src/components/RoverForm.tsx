import React from "react";

function RoverForm({ onSubmit }) {
  const [error, setError] = React.useState("");

  const directions = ["N", "E", "S", "W"];

  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      posX: { value: posX },
      posY: { value: posY },
      direction: { value: direction },
    } = event.target.elements;

    if (!posX || !posY) {
      setError("Both X and Y positions are required");
    } else if (!direction || !directions.includes(direction)) {
      setError("A valid starting direction is required to orient the rover");
    } else {
      onSubmit({ posX, posY, direction });
      setError("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col border border-solid rounded p-5 my-2"
    >
      <div className="mb-3">
        <h3 className="text-xl font-medium">Create Rover</h3>
        <p>Input start co-ordinates of rover, and direction</p>
      </div>
      {error ? (
        <div
          role="alert"
          className="bg-red-50 border border-solid rounded p-3 text-sm text-red-500 border-red-500"
        >
          {error}
        </div>
      ) : null}
      <div className="flex flex-col">
        <div className="my-1">
          <label className="font-medium text-sm" htmlFor="posX">
            X Position
          </label>
          <input
            name="posX"
            id="posX"
            type="number"
            className="border border-solid rounded px-3 py-1 w-full"
            placeholder="i.e: 1"
          />
        </div>
        <div className="my-1">
          <label className="font-medium text-sm" htmlFor="posY">
            Y Position
          </label>
          <input
            name="posY"
            id="posY"
            type="number"
            className="border border-solid rounded px-3 py-1 w-full"
            placeholder="i.e: 3"
          />
        </div>
        <div className="my-1">
          <label className="font-medium text-sm" htmlFor="direction">
            Direction
          </label>
          <input
            name="direction"
            id="direction"
            type="text"
            className="border border-solid rounded px-3 py-1 w-full"
            placeholder="i.e: N"
          />
        </div>
        <div className="my-1">
          <button className="bg-indigo-900 text-white px-3 py-1 rounded">
            Add Rover
          </button>
        </div>
      </div>
    </form>
  );
}

export default RoverForm;
