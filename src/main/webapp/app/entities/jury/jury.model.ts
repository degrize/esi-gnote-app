export interface IJury {
  id?: number;
  presidentJury?: string;
}

export class Jury implements IJury {
  constructor(public id?: number, public presidentJury?: string) {}
}

export function getJuryIdentifier(jury: IJury): number | undefined {
  return jury.id;
}
