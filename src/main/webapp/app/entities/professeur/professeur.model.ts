export interface IProfesseur {
  id?: number;
  nomProf?: string;
  prenomProf?: string;
  contactProf?: string | null;
}

export class Professeur implements IProfesseur {
  constructor(public id?: number, public nomProf?: string, public prenomProf?: string, public contactProf?: string | null) {}
}

export function getProfesseurIdentifier(professeur: IProfesseur): number | undefined {
  return professeur.id;
}
