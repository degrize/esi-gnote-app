import { IInspecteur } from 'app/entities/inspecteur/inspecteur.model';
import { IProfesseur } from 'app/entities/professeur/professeur.model';

export interface IEtudiant {
  id?: number;
  matriculeET?: string;
  nomET?: string;
  prenomET?: string;
  photoContentType?: string | null;
  photo?: string | null;
  numeroParent?: string | null;
  numeroTuteur?: string | null;
  contactET?: string | null;
  inspecteurs?: IInspecteur[] | null;
  professeurs?: IProfesseur[] | null;
}

export class Etudiant implements IEtudiant {
  constructor(
    public id?: number,
    public matriculeET?: string,
    public nomET?: string,
    public prenomET?: string,
    public photoContentType?: string | null,
    public photo?: string | null,
    public numeroParent?: string | null,
    public numeroTuteur?: string | null,
    public contactET?: string | null,
    public inspecteurs?: IInspecteur[] | null,
    public professeurs?: IProfesseur[] | null
  ) {}
}

export function getEtudiantIdentifier(etudiant: IEtudiant): number | undefined {
  return etudiant.id;
}
