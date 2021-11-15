import React from "react";

function PlateauForm({ onSubmit }) {
  const [error, setError] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      x: { value: x },
      y: { value: y },
    } = event.target.elements;

    // check if is numeric
    if (!x || !y) {
      setError("Both X and Y values are required");
    } else if (x === 0 || y === 0) {
      setError("X and Y values cannot be 0");
    } else {
      onSubmit({ x, y });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col border border-solid rounded p-5 my-2"
    >
      <div className="mb-3">
        <h3 className="text-xl font-medium">Create Plateau</h3>
        <p>Input the size of the plateau</p>
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
          <label className="font-medium text-sm" htmlFor="x">
            X Boundary
          </label>
          <input
            type="text"
            name="x"
            id="x"
            className="border border-solid rounded px-3 py-1 w-full"
            placeholder="i.e: 10"
          />
        </div>
        <div className="my-1">
          <label className="font-medium text-sm" htmlFor="y">
            Y Boundary
          </label>
          <input
            type="text"
            name="y"
            id="y"
            className="border border-solid rounded px-3 py-1 w-full"
            placeholder="i.e: 10"
          />
        </div>
        <div className="my-1">
          <button className="bg-indigo-900 text-white px-3 py-1 rounded">
            Generate
          </button>
        </div>
      </div>
    </form>
  );
}

export default PlateauForm;
