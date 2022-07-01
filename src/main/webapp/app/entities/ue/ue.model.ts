import { IEC } from 'app/entities/ec/ec.model';
import { IFiliere } from 'app/entities/filiere/filiere.model';

export interface IUE {
  id?: number;
  nomUE?: string | null;
  eCS?: IEC[] | null;
  filieres?: IFiliere[] | null;
}

export class UE implements IUE {
  constructor(public id?: number, public nomUE?: string | null, public eCS?: IEC[] | null, public filieres?: IFiliere[] | null) {}
}

export function getUEIdentifier(uE: IUE): number | undefined {
  return uE.id;
}
