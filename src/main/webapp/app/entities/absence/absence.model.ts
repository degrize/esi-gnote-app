import { IProfesseur } from 'app/entities/professeur/professeur.model';
import { IInspecteur } from 'app/entities/inspecteur/inspecteur.model';
import { IEC } from 'app/entities/ec/ec.model';
import { IEtudiant } from 'app/entities/etudiant/etudiant.model';

export interface IAbsence {
  id?: number;
  etat?: string;
  heureDebut?: string | null;
  heureFin?: string | null;
  justificationEcrit?: string | null;
  justificationNumeriqueContentType?: string | null;
  justificationNumerique?: string | null;
  professeur?: IProfesseur | null;
  inspecteur?: IInspecteur | null;
  eC?: IEC | null;
  etudiant?: IEtudiant | null;
}

export class Absence implements IAbsence {
  constructor(
    public id?: number,
    public etat?: string,
    public heureDebut?: string | null,
    public heureFin?: string | null,
    public justificationEcrit?: string | null,
    public justificationNumeriqueContentType?: string | null,
    public justificationNumerique?: string | null,
    public professeur?: IProfesseur | null,
    public inspecteur?: IInspecteur | null,
    public eC?: IEC | null,
    public etudiant?: IEtudiant | null
  ) {}
}

export function getAbsenceIdentifier(absence: IAbsence): number | undefined {
  return absence.id;
}
