export interface IBulletin {
  id?: number;
  signatureDG?: string;
  observation?: string;
}

export class Bulletin implements IBulletin {
  constructor(public id?: number, public signatureDG?: string, public observation?: string) {}
}

export function getBulletinIdentifier(bulletin: IBulletin): number | undefined {
  return bulletin.id;
}
