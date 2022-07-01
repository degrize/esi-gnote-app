import { IProfesseur } from 'app/entities/professeur/professeur.model';

export interface IEC {
  id?: number;
  nomEC?: string;
  coeff?: number;
  professeurs?: IProfesseur[] | null;
}

export class EC implements IEC {
  constructor(public id?: number, public nomEC?: string, public coeff?: number, public professeurs?: IProfesseur[] | null) {}
}

export function getECIdentifier(eC: IEC): number | undefined {
  return eC.id;
}
