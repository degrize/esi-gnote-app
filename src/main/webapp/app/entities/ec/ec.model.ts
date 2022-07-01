export interface IEC {
  id?: number;
  nomEC?: string;
  coeff?: number;
}

export class EC implements IEC {
  constructor(public id?: number, public nomEC?: string, public coeff?: number) {}
}

export function getECIdentifier(eC: IEC): number | undefined {
  return eC.id;
}
