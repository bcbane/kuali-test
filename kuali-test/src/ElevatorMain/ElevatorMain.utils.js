import { get } from 'lodash';

export const callElevator = (state, action) => {
  const requestedFloor = action.payload.requestedFloor;
  const availableElevators = state.elevators.reduce(
    (elevators, elevator, index) => {
      const updatedElevators = elevators;
      const idealElevatorScenario = (
        elevator.currentGoal === null &&
        elevator.currentFloor === requestedFloor
      );

      if (idealElevatorScenario) {
        updatedElevators.push(elevator)
      } else if () {
        
      }
      return updatedElevators
    }, 
    []
  )
}