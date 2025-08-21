//import { string } from "fast-check";

type Route = ReadonlyArray<ReadonlyArray<number>>;
type gossipKnowledge = Set<number>;
const minInADay = 480;

export function main(input: string): number | "never" {
  const busRoutes: Route = createArrayFromString(input);
  const result:number = simulateBusDrivers(busRoutes,0,initGossip(busRoutes.length))
  if (result == -1){
    return ("never");
  } else {
    return(result);
  }
}

export function createArrayFromString(input: string): number[][] {
  return input.split("\n").map((x) => x.split(" ").map((x) => Number(x)));
}

export function initGossip(numberOfDrivers:number): gossipKnowledge[]{
 return Array.from({length:numberOfDrivers},((_,indx)=> new Set<number>([indx])));
}

export function allBusDriversHaveGossiped(gossips: gossipKnowledge[], numberOfDrivers:number):boolean {
    return gossips.every(x=>x.size === numberOfDrivers);
}

export function getCurrentStop(minute:number,routes:Route):number[] {
  return routes.map(x=>x[minute%x.length]??-1);
}

export function getDriversAtSameStop(currentStops:number[],driverIndex:number):number[]{
  const atStop = currentStops[driverIndex];
  return currentStops.map((pos,indx) => (pos === atStop ? indx :-1)).filter(x=>x!=-1);
}

export function shareGossip(gossips:gossipKnowledge[],currentStops:number[],):gossipKnowledge[] {
  return gossips.map((_,driverIndex) => {
    const driversAtStop:number[] = getDriversAtSameStop(currentStops,driverIndex);
    return driversAtStop.reduce((accumulator, currentDriverIdx)=> accumulator.add(currentDriverIdx),new Set<number>());
  });
}

export function simulateBusDrivers(busRoutes:Route,minute:number, gossips:gossipKnowledge[]):number {
  if (minute >= minInADay){
    return -1;
  }
  if (allBusDriversHaveGossiped(gossips,busRoutes.length)){
    return minute;
  }
  return simulateBusDrivers(busRoutes,minute+1, shareGossip(gossips, getCurrentStop(minute,busRoutes)));
}

// console.log(createArrayFromString("3 1 2 3\n3 2 3 1\n4 2 3 4 5"));
// console.log(initGossip(createArrayFromString("3 1 2 3\n3 2 3 1\n4 2 3 4 5").length));
// console.log(allBusDriversHaveGossiped([new Set<number>([1,2]),new Set<number>([1,2])],2));
// console.log(getDriversAtSameStop(getCurrentStop(0,createArrayFromString("3 1 2 3\n3 2 3 1\n4 2 3 4 5")),1));
// console.log(getCurrentStop(0,createArrayFromString("3 1 2 3\n3 2 3 1\n4 2 3 4 5")));
console.log(main("3 1 2 3\n3 2 3 1\n4 2 3 4 5"));
