import React, { useState } from "react";

interface IPlateau {
  boundaries: {
    x: number;
    y: number;
  };
  rovers: {
    posX: number;
    posY: number;
    direction: string;
  }[];
  onSubmit: Function;
}

function Plateau({ boundaries, rovers, onSubmit }: IPlateau) {
  const [error, setError] = useState("");

  const handleSubmit = (event, rover) => {
    event.preventDefault();

    const {
      movements: { value: movements },
      index: { value: index },
    } = event.target.elements;

    [...movements].forEach((char) => {
      if (char === "M") {
        moveRover(index);
      } else if (char === "L") {
        turnLeft(index);
      } else if (char === "R") {
        turnRight(index);
      }
    });
    return rover;
  };

  const clearRovers = () => {
    onSubmit([]);
  };

  const moveRover = (index) => {
    let rover = rovers[index];
    if (rover.direction.localeCompare("N") === 0) {
      if (!(rover.posY + 1 >= boundaries.y)) {
        rover.posY = rover.posY + 1;
        onSubmit(rovers);
      } else {
        setError("Rover out of bounds, please try another movement.");
      }
    } else if (rover.direction.localeCompare("E") === 0) {
      if (!(rover.posX + 1 >= boundaries.x)) {
        rover.posX = rover.posX + 1;
        onSubmit(rovers);
      } else {
        setError("Rover out of bounds, please try another movement.");
      }
    } else if (rover.direction.localeCompare("W") === 0) {
      if (rover.posX !== 0) {
        rover.posX = rover.posX - 1;
        onSubmit(rovers);
      } else {
        setError("Rover out of bounds, please try another movement.");
      }
    } else if (rover.direction.localeCompare("S") === 0) {
      if (rover.posY !== 0) {
        rover.posY = rover.posY - 1;
        onSubmit(rovers);
      } else {
        setError("Rover out of bounds, please try another movement.");
      }
    }
  };

  const turnLeft = (index) => {
    let rover = rovers[index];
    if (rover.direction.localeCompare("N") === 0) {
      rover.direction = "W";
      onSubmit(rovers);
    } else if (rover.direction.localeCompare("E") === 0) {
      rover.direction = "N";
      onSubmit(rovers);
    } else if (rover.direction.localeCompare("W") === 0) {
      rover.direction = "S";
      onSubmit(rovers);
    } else if (rover.direction.localeCompare("S") === 0) {
      rover.direction = "E";
      onSubmit(rovers);
    }
  };

  const turnRight = (index) => {
    let rover = rovers[index];
    if (rover.direction.localeCompare("N") === 0) {
      rover.direction = "E";
      onSubmit(rovers);
    } else if (rover.direction.localeCompare("E") === 0) {
      rover.direction = "S";
      onSubmit(rovers);
    } else if (rover.direction.localeCompare("W") === 0) {
      rover.direction = "N";
      onSubmit(rovers);
    } else if (rover.direction.localeCompare("S") === 0) {
      rover.direction = "W";
      onSubmit(rovers);
    }
  };

  const positionExists = (i, j) => {
    let cell;
    rovers.forEach((rover) => {
      if (rover.posX === j && rover.posY === i) {
        if (rover.direction.localeCompare("N") === 0) {
          cell = <p>northy</p>;
        } else if (rover.direction.localeCompare("E") === 0) {
          cell = <p>easty</p>;
        } else if (rover.direction.localeCompare("W") === 0) {
          cell = <p>westy</p>;
        } else if (rover.direction.localeCompare("S") === 0) {
          cell = <p>southy</p>;
        }
      }
    });
    return cell;
  };

  const drawPlateau = () => {
    const plateauItems = [] as any;
    for (let i = boundaries.y - 1; i > -1; i--) {
      const plateauCells = [] as any;
      for (let j = 0; j < boundaries.x; j++) {
        let position = boundaries.y * i + j;
        let rover = positionExists(i, j);
        if (rover) {
          plateauCells.push(
            <td
              className="border w-32 h-32 border-solid bg-gray-100 text-center"
              key={position}
            >
              {rover}
            </td>
          );
        } else {
          plateauCells.push(
            <td
              className="border w-32 h-32 border-solid bg-gray-100 text-center"
              key={position}
            ></td>
          );
        }
      }
      plateauItems.push(<tr key={i}>{plateauCells}</tr>);
    }
    return plateauItems;
  };

  return (
    <div>
      <div>
        {error ? (
          <div
            role="alert"
            className="bg-red-50 border border-solid rounded p-3 text-sm text-red-500 border-red-500 mb-2"
          >
            {error}
          </div>
        ) : null}
      </div>
      <table>
        <tbody>{drawPlateau()}</tbody>
      </table>
      <div className="flex flex-col gap-4">
        {rovers.length ? (
          <button
            onClick={clearRovers}
            className="bg-red-500 text-white rounded px-3 py-2 my-2"
          >
            Clear All Rovers
          </button>
        ) : null}
        {rovers.map((rover, index) => (
          <div className="border border-solid rounded p-5 my-3" key={index}>
            <h3 className="text-2xl font-medium">Rover No. {index + 1}</h3>

            <div className="flex flex-col">
              <form onSubmit={(event) => handleSubmit(event, rover)}>
                <label className="font-medium my-2" htmlFor="movements">
                  Custom Movements
                </label>
                <input
                  type="text"
                  id="movements"
                  name="movements"
                  className="border border-solid rounded px-3 py-1"
                  placeholder="i.e: LMLMMMM"
                />
                <input type="hidden" name="index" value={index} />
                <button className="bg-green-500 text-white rounded px-3 py-1 my-2">
                  Move Rover
                </button>
              </form>
              <p>
                <span className="font-medium">Current position:</span> (
                {rover.posX}, {rover.posY})
              </p>
              <p>
                <span className="font-medium">Direction:</span>{" "}
                {rover.direction}
              </p>
            </div>
            <div className="mt-2">
              <button
                className="bg-indigo-900 text-white rounded text-sm px-3 py-1 mr-1"
                onClick={() => turnLeft(index)}
              >
                Turn Left
              </button>
              <button
                className="bg-indigo-900 text-white rounded text-sm px-3 py-1 mr-1"
                onClick={() => turnRight(index)}
              >
                Turn Right
              </button>
              <button
                className="bg-indigo-900 text-white rounded text-sm px-3 py-1 mr-1"
                onClick={() => moveRover(index)}
              >
                Move Forward
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Plateau;
