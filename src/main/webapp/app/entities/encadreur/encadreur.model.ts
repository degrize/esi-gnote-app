export interface IEncadreur {
  id?: number;
  nomEnc?: string;
  prenomsEnc?: string | null;
  emailEnc?: string | null;
}

export class Encadreur implements IEncadreur {
  constructor(public id?: number, public nomEnc?: string, public prenomsEnc?: string | null, public emailEnc?: string | null) {}
}

export function getEncadreurIdentifier(encadreur: IEncadreur): number | undefined {
  return encadreur.id;
}
