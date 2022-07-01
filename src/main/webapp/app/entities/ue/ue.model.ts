export interface IUE {
  id?: number;
  nomUE?: string | null;
}

export class UE implements IUE {
  constructor(public id?: number, public nomUE?: string | null) {}
}

export function getUEIdentifier(uE: IUE): number | undefined {
  return uE.id;
}
