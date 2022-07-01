import { IFiliere } from 'app/entities/filiere/filiere.model';
import { IEC } from 'app/entities/ec/ec.model';
import { IProfesseur } from 'app/entities/professeur/professeur.model';
import { IEtudiant } from 'app/entities/etudiant/etudiant.model';

export interface IClasse {
  id?: number;
  nomClasse?: string;
  filiere?: IFiliere | null;
  eCS?: IEC[] | null;
  professeurs?: IProfesseur[] | null;
  etudiants?: IEtudiant[] | null;
}

export class Classe implements IClasse {
  constructor(
    public id?: number,
    public nomClasse?: string,
    public filiere?: IFiliere | null,
    public eCS?: IEC[] | null,
    public professeurs?: IProfesseur[] | null,
    public etudiants?: IEtudiant[] | null
  ) {}
}

export function getClasseIdentifier(classe: IClasse): number | undefined {
  return classe.id;
}
