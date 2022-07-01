import { ICycle } from 'app/entities/cycle/cycle.model';
import { IUE } from 'app/entities/ue/ue.model';
import { IClasse } from 'app/entities/classe/classe.model';

export interface IFiliere {
  id?: number;
  nomFiliere?: string;
  etudiant?: ICycle | null;
  uES?: IUE[] | null;
  classes?: IClasse[] | null;
}

export class Filiere implements IFiliere {
  constructor(
    public id?: number,
    public nomFiliere?: string,
    public etudiant?: ICycle | null,
    public uES?: IUE[] | null,
    public classes?: IClasse[] | null
  ) {}
}

export function getFiliereIdentifier(filiere: IFiliere): number | undefined {
  return filiere.id;
}
