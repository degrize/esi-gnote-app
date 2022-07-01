export interface IDemandeInspecteurEtudiant {
  id?: number;
  message?: string;
}

export class DemandeInspecteurEtudiant implements IDemandeInspecteurEtudiant {
  constructor(public id?: number, public message?: string) {}
}

export function getDemandeInspecteurEtudiantIdentifier(demandeInspecteurEtudiant: IDemandeInspecteurEtudiant): number | undefined {
  return demandeInspecteurEtudiant.id;
}
