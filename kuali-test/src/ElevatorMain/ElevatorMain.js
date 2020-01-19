import React from 'react';

function ElevatorMain({ elevators }) {
  return (
    <div className="App">
      <header className="App-header">
        {
          elevators.map((elevator, index) => {
            return (
            <div>
              <p>Elevator {index + 1}</p>
              <p>Current Floor: {elevator.currentFloor}</p>
              <p>Current Goals: {elevator.currentGoals}</p>
              <p>Current Direction: {elevator.direction}</p>
              <p>Current Total Trips: {elevator.totalTrips}</p>
            </div>
            )
          }
        )}
      </header>
    </div>
  );
}

export default ElevatorMain;
