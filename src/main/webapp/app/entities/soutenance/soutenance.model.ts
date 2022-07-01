import { TypeSoutenance } from 'app/entities/enumerations/type-soutenance.model';

export interface ISoutenance {
  id?: number;
  typeSout?: TypeSoutenance;
  themeSout?: string;
  noteSout?: number;
}

export class Soutenance implements ISoutenance {
  constructor(public id?: number, public typeSout?: TypeSoutenance, public themeSout?: string, public noteSout?: number) {}
}

export function getSoutenanceIdentifier(soutenance: ISoutenance): number | undefined {
  return soutenance.id;
}
