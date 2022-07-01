import dayjs from 'dayjs/esm';

export interface IHoraire {
  id?: number;
  dateSout?: dayjs.Dayjs;
  dateEffet?: dayjs.Dayjs | null;
}

export class Horaire implements IHoraire {
  constructor(public id?: number, public dateSout?: dayjs.Dayjs, public dateEffet?: dayjs.Dayjs | null) {}
}

export function getHoraireIdentifier(horaire: IHoraire): number | undefined {
  return horaire.id;
}
