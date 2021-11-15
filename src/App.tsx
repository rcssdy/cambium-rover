import React, { useState } from "react";
import PlateauForm from "./components/PlateauForm";
import RoverForm from "./components/RoverForm";
import Plateau from "./components/Plateau";

function App() {
  const [boundaries, setBoundaries] = useState({ x: 0, y: 0 });
  const [rovers, setRovers] = useState([]);
  const [error, setError] = useState("");

  const handlePlateauFormSubmit = (boundaries) => {
    if (rovers.length) {
      setError(
        "Cannot change size of boundaries whilst rovers exist on plateau"
      );
    } else {
      setBoundaries({ x: boundaries.x, y: boundaries.y });
      setError("");
    }
  };

  const handleRoverFormSubmit = (rover) => {
    if (
      parseInt(rover.posX) >= boundaries.x ||
      parseInt(rover.posY) >= boundaries.y
    ) {
      setError(
        "A rover cannot be added outside of the boundaries of the plateau"
      );
    } else if (
      rovers.find(
        (item) =>
          item.posX === parseInt(rover.posX) &&
          item.posY === parseInt(rover.posY)
      )
    ) {
      setError(
        "Rover cannot be added, as a rover is already at these co-ordinates"
      );
    } else {
      setRovers([
        ...rovers,
        {
          posX: parseInt(rover.posX),
          posY: parseInt(rover.posY),
          direction: rover.direction,
        },
      ]);
      setError("");
    }
  };

  const handleRoverMovements = (rovers) => {
    setRovers([...rovers]);
  };

  return (
    <div className="App">
      <div className="container mx-auto my-5">
        <div className="mb-5">
          <h2 className="text-3xl font-medium">Mars Rover Implementation</h2>
        </div>
        <div className="flex gap-8">
          <div className="w-1/4">
            <PlateauForm onSubmit={handlePlateauFormSubmit} />
            <RoverForm onSubmit={handleRoverFormSubmit} />
          </div>
          <div className="w-3/4">
            {error ? (
              <div
                role="alert"
                className="bg-red-50 border border-solid rounded p-3 text-sm text-red-500 border-red-500 mb-3"
              >
                {error}
              </div>
            ) : null}
            <Plateau
              boundaries={boundaries}
              rovers={rovers}
              onSubmit={handleRoverMovements}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
