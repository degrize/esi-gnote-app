import { TypeNote } from 'app/entities/enumerations/type-note.model';

export interface INote {
  id?: number;
  note?: number;
  typeNote?: TypeNote;
}

export class Note implements INote {
  constructor(public id?: number, public note?: number, public typeNote?: TypeNote) {}
}

export function getNoteIdentifier(note: INote): number | undefined {
  return note.id;
}
