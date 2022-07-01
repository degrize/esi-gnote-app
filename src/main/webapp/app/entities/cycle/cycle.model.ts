export interface ICycle {
  id?: number;
  nomCycle?: string;
}

export class Cycle implements ICycle {
  constructor(public id?: number, public nomCycle?: string) {}
}

export function getCycleIdentifier(cycle: ICycle): number | undefined {
  return cycle.id;
}
