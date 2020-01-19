import { get, isNil } from 'lodash';

const movingUp = 'UP';
const movingDown = 'DOWN';

const isIdealElevatorScenario = (elevatorToCheck, requestedFloor) => (
  get(elevatorToCheck, 'currentGoals') === null &&
  get(elevatorToCheck, 'currentFloor') === requestedFloor
);

export const callElevator = (state, action) => {
  const requestedFloor = action.payload.requestedFloor;

  const elevatorIndexToSend = state.elevators.reduce(
    (bestElevatorIndex, elevator, index, allElevators) => {
      const currentFloor = get(elevator, 'currentFloor');
      const direction = get(elevator, 'direction');
      const currentGoals = get(elevator, 'currentGoals');
      const isUnoccupied = isNil(currentGoals);

      const currentBestElevator = !isNil(bestElevatorIndex) ? allElevators[bestElevatorIndex] : null;
      const isCurrentElevatorCloserToRequest = (
        Math.abs(requestedFloor - currentFloor) < Math.abs(requestedFloor - get(currentBestElevator, currentFloor))
      );
      //A previous elevator is the best solution
      if (!isNil(currentBestElevator) && isIdealElevatorScenario(currentBestElevator, requestedFloor)) {
        return bestElevatorIndex;
      } 

      // The current elevator is the best solution
      else if (isIdealElevatorScenario(elevator, requestedFloor)) {
        return index;
      } 

      // The current Elevator is moving toward 
      // requested floor and is closer than current bestElevator
      else if (
        (
          (currentFloor < requestedFloor && direction === movingUp) ||
          (currentFloor > requestedFloor && direction === movingDown)
        )
      ) {
        if (isNil(currentBestElevator)) {
          return index;
        } else if (isCurrentElevatorCloserToRequest) {
          return index;
        }
      }
      
      // the current elevator is unnoccupied and closer that current best elevator
      else if (isUnoccupied) {
        if (isNil(currentBestElevator)) {
          return index;
        }
        else if (isCurrentElevatorCloserToRequest) {
          return index;
        }
      }

      return bestElevatorIndex;
    }, 
    null
  );

  if (!isNil(elevatorIndexToSend)) {
    const elevatorToSend = state.elevators[elevatorIndexToSend];
    const currentFloor = elevatorToSend.currentFloor;
    const requestedFloorDirection = (requestedFloor - currentFloor) > 0 ? movingUp : movingDown;
    let newGoals = elevatorToSend.currentGoals;
    newGoals.push(requestedFloor);
    if (newGoals.length > 1) {
      requestedFloorDirection === movingUp ? 
        newGoals.sort((a, b) => a - b) : 
        newGoals.sort((a, b) => b - a)
    }


    const updatedElevatorToSend = {
      ...elevatorToSend,
      currentGoals: newGoals,
      direction: requestedFloorDirection,
    };

    const updatedElevators = state.elevators;
    updatedElevators[elevatorIndexToSend] = updatedElevatorToSend;

    return {
      ...state,
      elevators: updatedElevators,
    }
  }
}

export const reportFloor = (state, action) => {
  const elevatorIndex = action.payload.elevatorIndex;
  const currentFloor = action.payload.currentFloor;
  const floorsPassed = action.payload.floorsPassed;

  const updatedElevator = {
    ...state.elevators[elevatorIndex],
    currentFloor,
    floorsPassed: floorsPassed++,
  };

  const updatedElevators = state.elevators;
  updatedElevators[elevatorIndex] = updatedElevator;

  return {
    ...state,
    elevators: updatedElevators,
  }
}

export const openDoor = (state, action) => {
  const elevatorIndex = action.payload.elevatorIndex;

  const updatedElevator = {
    ...state.elevators[elevatorIndex],
    isDoorOpen: true,
  };

  const updatedElevators = state.elevators;
  updatedElevators[elevatorIndex] = updatedElevator;

  return {
    ...state,
    elevators: updatedElevators,
  }
}

export const closeDoor = (state, action) => {
  const elevatorIndex = action.payload.elevatorIndex;

  const updatedElevator = {
    ...state.elevators[elevatorIndex],
    isDoorOpen: false,
  };

  const updatedElevators = state.elevators;
  updatedElevators[elevatorIndex] = updatedElevator;

  return {
    ...state,
    elevators: updatedElevators,
  }
}

export const arrivedAtGoal = (state, action) => {
  const elevatorIndex = action.payload.elevatorIndex;

  const elevator = state.elevators[elevatorIndex];
  const currentGoals = elevator.currentGoals;
  const direction = elevator.direction;
  const totalTrips = elevator.totalTrips;
  const updatedGoals = currentGoals.length > 1 ? currentGoals.splice(0, 1) : null;

  const updatedElevator = {
    ...elevator,
    currentGoals: updatedGoals,
    direction: isNil(updatedGoals) ? null : direction,
    totalTrips: totalTrips++,
  };

  const updatedElevators = state.elevators;
  updatedElevators[elevatorIndex] = updatedElevator;

  return {
    ...state,
    elevators: updatedElevators,
  }
}

