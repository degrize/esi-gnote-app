export interface IFiliere {
  id?: number;
  nomFiliere?: string;
}

export class Filiere implements IFiliere {
  constructor(public id?: number, public nomFiliere?: string) {}
}

export function getFiliereIdentifier(filiere: IFiliere): number | undefined {
  return filiere.id;
}
