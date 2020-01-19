import React, { useReducer } from 'react';
import ElevatorMain from './ElevatorMain';

const initialState = {
  numberOfFloors: 34,
  elevators: [
    {},
    {},
    {},
    {},
    {},
  ]
};

function reducer(state, action) {
  switch (action.type) {
    case 'callElevator':
      return { count: state.count + 1 };
    case 'floorPassed':
      return { count: state.count - 1 };
    case 'arrived':
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
