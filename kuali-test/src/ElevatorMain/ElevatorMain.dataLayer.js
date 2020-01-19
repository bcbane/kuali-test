import React, { useReducer } from 'react';
import ElevatorMain from './ElevatorMain';

const initialState = {
  numberOfFloors: 20,
  elevators: [
    {
      currentFloor: 0,
      currentGoal: null,
      direction: null,
      totalTrips: 0,
      isDoorOpen: false,
    },
    {
      currentFloor: 0,
      currentGoal: null,
      direction: null,
      totalTrips: 0,
      isDoorOpen: false,
    },
    {
      currentFloor: 0,
      currentGoal: null,
      direction: null,
      totalTrips: 0,
      isDoorOpen: false,
    },
  ]
};

function reducer(state, action) {
  switch (action.type) {
    case 'callElevator':
      return { ...callElevator(state, action) };
    case 'reportFloor':
      return { count: state.count - 1 };
    case 'openDoor':
      return { count: state.count - 1 };
    case 'closeDoor':
      return { count: state.count - 1 };
    case 'arrivedAtGoal':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function ElevatorMainDataLayer() {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
   
  );
}

export default ElevatorMainDataLayer;
