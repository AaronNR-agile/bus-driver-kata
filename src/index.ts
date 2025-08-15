//import { string } from "fast-check";

type Route = ReadonlyArray<ReadonlyArray<number>>;
type gossipKnowledge = Set<number>;
const minInADay = 480;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// export function main(input: string): number | "never" {
//   let busRoutes: Route = createArrayFromString(input);

//   return 1;
// }

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
  return routes.map(x=>x[minute%x.length]);
}

export function getDriversAtSameStop(currentStops:number[],driverIndex:number):number[]{
  const atStop = currentStops[driverIndex];
  return currentStops.map((pos,indx) => (pos === atStop ? indx :-1)).filter(x=>x!=-1);
}

console.log(createArrayFromString("3 1 2 3\n3 2 3 1\n4 2 3 4 5"));
console.log(initGossip(createArrayFromString("3 1 2 3\n3 2 3 1\n4 2 3 4 5").length));
console.log(allBusDriversHaveGossiped([new Set<number>([1,2]),new Set<number>([1,2])],2));
console.log(getDriversAtSameStop([4,1,1],2));
