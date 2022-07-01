export interface IDemandeInspecteurDE {
  id?: number;
  message?: string;
}

export class DemandeInspecteurDE implements IDemandeInspecteurDE {
  constructor(public id?: number, public message?: string) {}
}

export function getDemandeInspecteurDEIdentifier(demandeInspecteurDE: IDemandeInspecteurDE): number | undefined {
  return demandeInspecteurDE.id;
}
