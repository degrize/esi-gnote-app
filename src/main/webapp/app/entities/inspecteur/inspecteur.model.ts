export interface IInspecteur {
  id?: number;
  nomInspecteur?: string;
  prenomInspecteur?: string | null;
  contactInspecteur?: string | null;
}

export class Inspecteur implements IInspecteur {
  constructor(
    public id?: number,
    public nomInspecteur?: string,
    public prenomInspecteur?: string | null,
    public contactInspecteur?: string | null
  ) {}
}

export function getInspecteurIdentifier(inspecteur: IInspecteur): number | undefined {
  return inspecteur.id;
}
