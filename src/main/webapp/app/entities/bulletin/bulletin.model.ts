import { IEtudiant } from 'app/entities/etudiant/etudiant.model';
import { IProfesseur } from 'app/entities/professeur/professeur.model';

export interface IBulletin {
  id?: number;
  signatureDG?: string;
  observation?: string;
  etudiant?: IEtudiant | null;
  professeurs?: IProfesseur[] | null;
}

export class Bulletin implements IBulletin {
  constructor(
    public id?: number,
    public signatureDG?: string,
    public observation?: string,
    public etudiant?: IEtudiant | null,
    public professeurs?: IProfesseur[] | null
  ) {}
}

export function getBulletinIdentifier(bulletin: IBulletin): number | undefined {
  return bulletin.id;
}
