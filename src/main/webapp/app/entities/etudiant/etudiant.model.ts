export interface IEtudiant {
  id?: number;
  matriculeET?: string;
  nomET?: string;
  prenomET?: string;
  photoContentType?: string | null;
  photo?: string | null;
  numeroParent?: string | null;
  numeroTuteur?: string | null;
  contactET?: string | null;
}

export class Etudiant implements IEtudiant {
  constructor(
    public id?: number,
    public matriculeET?: string,
    public nomET?: string,
    public prenomET?: string,
    public photoContentType?: string | null,
    public photo?: string | null,
    public numeroParent?: string | null,
    public numeroTuteur?: string | null,
    public contactET?: string | null
  ) {}
}

export function getEtudiantIdentifier(etudiant: IEtudiant): number | undefined {
  return etudiant.id;
}
