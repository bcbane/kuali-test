# kuali-test

After completing the 2 hour challenge I took some time to reflect on changes that I would make and the next steps I would take to improve the final solution. 

Changes to Elevator Problem Solution
* current model assumes that the user is setting a floor destination at the time that they request the elevator...which isn’t how elevators work. This is an oversight that should be resolved. 
* update the call elevator function to work based on the floor that the elevator is called from, instead of the floor that the user wants to go to. 
* Add a function that allows elevators to set a destination floor after the user has entered the elevator
* when the callElevator function is called and there is no elevator that can currently take the user, build a queue that will be checked the next time that an elevator state changes
* create a user interface that allows the user to set the initial number of floors and number of elevators
* Create a user interface that allows the user to select an elevator from a specific floor, “enter” the elevator, and select a floor to access
* Allow user to set an amount of time for elevators to travel between floors to simulate requesting an elevator while other elevators are moving
