export interface IClasse {
  id?: number;
  nomClasse?: string;
}

export class Classe implements IClasse {
  constructor(public id?: number, public nomClasse?: string) {}
}

export function getClasseIdentifier(classe: IClasse): number | undefined {
  return classe.id;
}
