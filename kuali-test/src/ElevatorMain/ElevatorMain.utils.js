import { get, isNull } from 'lodash';

const movingUp = 'UP';
const movingDown = 'DOWN';

const isIdealElevatorScenario = (elevatorToCheck) => (
  get(elevator, 'currentGoal') === null &&
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
      const currentGoal = get(elevator, 'currentGoal');
      const isUnoccupied = isNil(currentGoal);

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
  )
}