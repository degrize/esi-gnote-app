import { IUE } from 'app/entities/ue/ue.model';
import { IProfesseur } from 'app/entities/professeur/professeur.model';
import { INote } from 'app/entities/note/note.model';
import { IClasse } from 'app/entities/classe/classe.model';

export interface IEC {
  id?: number;
  nomEC?: string;
  coeff?: number;
  uE?: IUE | null;
  professeurs?: IProfesseur[] | null;
  notes?: INote[] | null;
  classes?: IClasse[] | null;
}

export class EC implements IEC {
  constructor(
    public id?: number,
    public nomEC?: string,
    public coeff?: number,
    public uE?: IUE | null,
    public professeurs?: IProfesseur[] | null,
    public notes?: INote[] | null,
    public classes?: IClasse[] | null
  ) {}
}

export function getECIdentifier(eC: IEC): number | undefined {
  return eC.id;
}
