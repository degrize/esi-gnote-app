export interface ISemestre {
  id?: number;
  nomSemestre?: string;
}

export class Semestre implements ISemestre {
  constructor(public id?: number, public nomSemestre?: string) {}
}

export function getSemestreIdentifier(semestre: ISemestre): number | undefined {
  return semestre.id;
}
