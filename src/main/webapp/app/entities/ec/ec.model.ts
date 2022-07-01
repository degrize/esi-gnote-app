import { IUE } from 'app/entities/ue/ue.model';
import { IProfesseur } from 'app/entities/professeur/professeur.model';

export interface IEC {
  id?: number;
  nomEC?: string;
  coeff?: number;
  uE?: IUE | null;
  professeurs?: IProfesseur[] | null;
}

export class EC implements IEC {
  constructor(
    public id?: number,
    public nomEC?: string,
    public coeff?: number,
    public uE?: IUE | null,
    public professeurs?: IProfesseur[] | null
  ) {}
}

export function getECIdentifier(eC: IEC): number | undefined {
  return eC.id;
}
