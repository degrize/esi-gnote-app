export interface IPlanche {
  id?: number;
  observation?: string;
}

export class Planche implements IPlanche {
  constructor(public id?: number, public observation?: string) {}
}

export function getPlancheIdentifier(planche: IPlanche): number | undefined {
  return planche.id;
}
