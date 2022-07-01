import { IFiliere } from 'app/entities/filiere/filiere.model';

export interface IUE {
  id?: number;
  nomUE?: string | null;
  filieres?: IFiliere[] | null;
}

export class UE implements IUE {
  constructor(public id?: number, public nomUE?: string | null, public filieres?: IFiliere[] | null) {}
}

export function getUEIdentifier(uE: IUE): number | undefined {
  return uE.id;
}
