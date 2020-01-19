import React, { useReducer } from 'react';
import ElevatorMain from './ElevatorMain';
import { 
  reportFloor, 
  callElevator,
  openDoor,
  closeDoor,
  arrivedAtGoal,
} from './ElevatorMain.utils';

const initialState = {
  numberOfFloors: 20,
  elevators: [
    {
      currentFloor: 0,
      currentGoals: null,
      direction: null,
      totalTrips: 0,
      isDoorOpen: false,
    },
    {
      currentFloor: 0,
      currentGoals: null,
      direction: null,
      totalTrips: 0,
      isDoorOpen: false,
    },
    {
      currentFloor: 0,
      currentGoals: null,
      direction: null,
      totalTrips: 0,
      isDoorOpen: false,
    },
  ]
};

function reducer(state, action) {
  switch (action.type) {
    default:
      return state;
    case 'callElevator':
      return { ...callElevator(state, action) };
    case 'reportFloor':
      return { ...reportFloor(state, action) };
    case 'openDoor':
      return { ...openDoor(state, action) };
    case 'closeDoor':
      return { ...closeDoor(state, action) };
    case 'arrivedAtGoal':
      return { ...arrivedAtGoal(state, action) };
  }
}

function ElevatorMainDataLayer() {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ElevatorMain 
      elevators={state.elevators}
    />
  );
}

export default ElevatorMainDataLayer;
