export interface IRecupererBulletin {
  id?: number;
  signatureEleve?: string;
  bulletinScanneContentType?: string;
  bulletinScanne?: string;
}

export class RecupererBulletin implements IRecupererBulletin {
  constructor(
    public id?: number,
    public signatureEleve?: string,
    public bulletinScanneContentType?: string,
    public bulletinScanne?: string
  ) {}
}

export function getRecupererBulletinIdentifier(recupererBulletin: IRecupererBulletin): number | undefined {
  return recupererBulletin.id;
}
