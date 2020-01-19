import { get, isNull } from 'lodash';

const movingUp = 'UP';
const movingDown = 'DOWN';

const isIdealElevatorScenario = (elevatorToCheck) => (
  get(elevator, 'currentGoal') === null &&
  get(elevator, 'currentFloor') === requestedFloor
);

export const callElevator = (state, action) => {
  const requestedFloor = action.payload.requestedFloor;
  const elevatorToSend = state.elevators.reduce(
    (bestElevator, elevator, index) => {
      const updatedElevators = elevators;

      const currentFloor = get(elevator, 'currentFloor');
      const direction = get(elevator, 'direction');

      if (isNull(bestElevator)) {
        return elevator;
      }

      //A previous elevator is the best solution
      if (!isNull(bestElevator) && isIdealElevatorScenario(currentBestElevator)) {
        return bestElevator;
      } 

      // The current elevator is the best solution
      else if (isIdealElevatorScenario(elevator)) {
        return elevator;
      } 

      // The current Elevator is moving toward 
      // requested floor and is closer than current bestElevator
      else if (
        (
          (currentFloor < requestedFloor && direction === movingUp) ||
          (currentFloor > requestedFloor && direction === movingDown)
        ) &&
          Math.abs(requestedFloor - currentFloor) < Math.abs(requestedFloor - get(bestElevator, currentFloor))
      ) {
        return elevator;
      }
      return updatedElevators
    }, 
    null
  )
}