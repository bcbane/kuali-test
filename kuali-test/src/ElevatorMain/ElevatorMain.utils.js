import { get, isNull } from 'lodash';

const movingUp = 'UP';
const movingDown = 'DOWN';

const isIdealElevatorScenario = (elevatorToCheck) => (
  get(elevator, 'currentGoals') === null &&
  get(elevator, 'currentFloor') === requestedFloor
);

export const callElevator = (state, action) => {
  const requestedFloor = action.payload.requestedFloor;

  const elevatorIndexToSend = state.elevators.reduce(
    (bestElevatorIndex, elevator, index, allElevators) => {
      const currentFloor = get(elevator, 'currentFloor');
      const direction = get(elevator, 'direction');
      const isCurrentElevatorCloserToRequest = (
        Math.abs(requestedFloor - currentFloor) < Math.abs(requestedFloor - get(bestElevator, currentFloor))
      );
      const currentGoals = get(elevator, 'currentGoals');
      const isUnoccupied = isNil(currentGoals);

      const currentBestElevator = !isNil(bestElevatorIndex) ? allElevators[bestElevatorIndex] : null;

      //A previous elevator is the best solution
      if (!isNull(currentBestElevator) && isIdealElevatorScenario(currentBestElevator)) {
        return bestElevatorIndex;
      } 

      // The current elevator is the best solution
      else if (isIdealElevatorScenario(elevator)) {
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
      direction === movingUp ? 
        numArray.sort((a, b) => a - b) : 
        numArray.sort((a, b) => b - a)
    }


    const updatedElevatorToSend = {
      ...elevatorToSend,
      currentGoals: newGoals,
      direction: requestedFloorDirection,
    }
  }
}