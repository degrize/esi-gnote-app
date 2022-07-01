import { IProfesseur } from 'app/entities/professeur/professeur.model';
import { IEtudiant } from 'app/entities/etudiant/etudiant.model';

export interface IInspecteur {
  id?: number;
  nomInspecteur?: string;
  prenomInspecteur?: string | null;
  contactInspecteur?: string | null;
  professeurs?: IProfesseur[] | null;
  etudiants?: IEtudiant[] | null;
}

export class Inspecteur implements IInspecteur {
  constructor(
    public id?: number,
    public nomInspecteur?: string,
    public prenomInspecteur?: string | null,
    public contactInspecteur?: string | null,
    public professeurs?: IProfesseur[] | null,
    public etudiants?: IEtudiant[] | null
  ) {}
}

export function getInspecteurIdentifier(inspecteur: IInspecteur): number | undefined {
  return inspecteur.id;
}
