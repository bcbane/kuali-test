import React, { useReducer } from 'react';
import ElevatorMain from './ElevatorMain';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
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
