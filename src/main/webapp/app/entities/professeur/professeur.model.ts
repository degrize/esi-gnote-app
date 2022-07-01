import { IEtudiant } from 'app/entities/etudiant/etudiant.model';
import { IClasse } from 'app/entities/classe/classe.model';
import { IEC } from 'app/entities/ec/ec.model';
import { IInspecteur } from 'app/entities/inspecteur/inspecteur.model';
import { IBulletin } from 'app/entities/bulletin/bulletin.model';
import { IJury } from 'app/entities/jury/jury.model';

export interface IProfesseur {
  id?: number;
  nomProf?: string;
  prenomProf?: string;
  contactProf?: string | null;
  etudiants?: IEtudiant[] | null;
  classes?: IClasse[] | null;
  eCS?: IEC[] | null;
  inspecteurs?: IInspecteur[] | null;
  bulletins?: IBulletin[] | null;
  juries?: IJury[] | null;
}

export class Professeur implements IProfesseur {
  constructor(
    public id?: number,
    public nomProf?: string,
    public prenomProf?: string,
    public contactProf?: string | null,
    public etudiants?: IEtudiant[] | null,
    public classes?: IClasse[] | null,
    public eCS?: IEC[] | null,
    public inspecteurs?: IInspecteur[] | null,
    public bulletins?: IBulletin[] | null,
    public juries?: IJury[] | null
  ) {}
}

export function getProfesseurIdentifier(professeur: IProfesseur): number | undefined {
  return professeur.id;
}
