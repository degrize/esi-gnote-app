import { IFiliere } from 'app/entities/filiere/filiere.model';
import { IProfesseur } from 'app/entities/professeur/professeur.model';

export interface IClasse {
  id?: number;
  nomClasse?: string;
  filiere?: IFiliere | null;
  professeurs?: IProfesseur[] | null;
}

export class Classe implements IClasse {
  constructor(public id?: number, public nomClasse?: string, public filiere?: IFiliere | null, public professeurs?: IProfesseur[] | null) {}
}

export function getClasseIdentifier(classe: IClasse): number | undefined {
  return classe.id;
}
