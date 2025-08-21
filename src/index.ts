//import { string } from "fast-check";

type Route = ReadonlyArray<ReadonlyArray<number>>;
type gossipKnowledge = Set<number>;
const minInADay = 480;

/**
 * Main function takes in bus routes in the form of a string where each stop is separated by spaces
 * and each bus drivers route is separated by a newline char, it calculates at which stop the bus drivers
 * will have shared all the gossip they have.
 * @param input - Takes in a string which contains the bus driver routes with /n to separate each route
 * @returns - number if they eventually share all the gossip around within the number of minutes in a day
 *            or "never" if they don't share within the minutes in a day.
 */
const main = (input: string): number | "never" => {
  const busRoutes: Route = createArrayFromString(input); // Created 2D read only array to store routes for each bus driver
  const result: number | undefined = simulateBusDrivers(
    busRoutes,
    0,
    initGossip(busRoutes.length)
  ); // result of the simulation starting from 0th minute
  if (result == undefined) {
    return "never";
  } else {
    return result; // minutes correspond to stops, no further computation required
  }
};

/**
 * Converts the string input from the user to an array the rest of the program can use to simulate
 * the day of the bus drivers
 * @param input - Takes in a string which contains the bus driver routes with /n to separate each route
 * @returns - Returns 2D Array where every inner array is each bus drivers route
 */
const createArrayFromString = (input: string): number[][] => {
  return input.split("\n").map((x) => x.split(" ").map((x) => Number(x))); // Converts inner arrays into numbers
};

/**
 * Returns a list of inital gossip where the indivual gossips are identified by the index of each buss driver
 * @param numberOfDrivers - Number of drivers present in the calculation
 * @returns - list of sets which are the initial gossip that each bus driver
 */
const initGossip = (numberOfDrivers: number): gossipKnowledge[] => {
  return Array.from(
    { length: numberOfDrivers },
    (_, index) => new Set<number>([index])
  ); // uses likeArray object and lamda to create n new sets with each set starting with index from 0 to (n-1)
};

/**
 * Checks if all the sets are the size of n bus drivers in the simulation
 * @param gossips - list of current gossips that each bus driver has
 * @param numberOfDrivers - number of drivers in simulation
 * @returns - true if they have all shared the gossip around, false if they still are yet to share all the gossip
 */
const allBusDriversHaveGossiped = (
  gossips: gossipKnowledge[],
  numberOfDrivers: number
): boolean => {
  return gossips.every((x) => x.size === numberOfDrivers); // Checks if all the sets are the size of n drivers
};

/**
 * The modulus of minute against the length of each individual route gives the index of the stop that we are on
 * @param minute - current minute of simulation
 * @param routes - 2D array of bus routes
 * @returns - Returns a list of which stop each bus driver is on
 */
const getCurrentStop = (minute: number, routes: Route): number[] => {
  return routes.map((x) => x[minute % x.length] ?? -1); // nullish coalesing operator to handle undefined case
  // (which won't happen if the input to the main function is correctly formated)
};

/**
 * Returns a list of all bus drivers that are at the same stop
 * @param currentStops - List of current stops that the bus drivers are at
 * @param driverIndex - The driver that we are checking against in respect to the current stops
 * @returns - A list of numbers which are the indexes of the drivers who are at the same stop
 */
const getDriversAtSameStop = (
  currentStops: number[],
  driverIndex: number
): number[] => {
  const atStop = currentStops[driverIndex];
  return currentStops
    .map((stop, index) => (stop === atStop ? index : -1))
    .filter((x) => x != -1);
};

/**
 * Returns the gossips of each bus driver as the union of the gossips of
 * bus drivers at the same stop
 * @param gossips - List of current gossips that each bus driver has
 * @param currentStops - List of current stops that each bus drivers is at
 * @returns  - Updated list of gossips at the current stop
 */
const shareGossip = (
  gossips: gossipKnowledge[],
  currentStops: number[]
): gossipKnowledge[] => {
  return gossips.map((_, driverIndex) => {
    const driversAtStop: number[] = getDriversAtSameStop(
      currentStops,
      driverIndex
    );
    return driversAtStop.reduce(
      (accumulator, currentDriverIdx) =>
        new Set<number>([
          ...Array.from(accumulator),
          ...Array.from(gossips[currentDriverIdx] ?? []),
        ]),
      new Set<number>()
    );
  });
};

/**
 * Returns result of the simulation either -1 which means the bus drivers will
 * never share all thier gossip with each other or a number representing the
 * minute/stop at which the gossips are all shared
 * @param busRoutes - 2D array of numbers which represent the routes the bus drivers will take
 * @param minute - current minute of the simulation inital is 0 and then recursively incremented
 * @param gossips - Array of sets containing gossips
 * @returns - result to the simulation whether the bus drivers will eventually all share thier gossips or not
 */
const simulateBusDrivers = (
  busRoutes: Route,
  minute: number,
  gossips: gossipKnowledge[]
): number | undefined => {
  if (minute >= minInADay) {
    return undefined;
  }
  if (allBusDriversHaveGossiped(gossips, busRoutes.length)) {
    return minute;
  }
  return simulateBusDrivers(
    busRoutes,
    minute + 1,
    shareGossip(gossips, getCurrentStop(minute, busRoutes))
  );
};
