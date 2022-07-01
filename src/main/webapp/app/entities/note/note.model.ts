import { IEtudiant } from 'app/entities/etudiant/etudiant.model';
import { IEC } from 'app/entities/ec/ec.model';
import { TypeNote } from 'app/entities/enumerations/type-note.model';

export interface INote {
  id?: number;
  note?: number;
  typeNote?: TypeNote;
  etudiants?: IEtudiant[] | null;
  eCS?: IEC[] | null;
}

export class Note implements INote {
  constructor(
    public id?: number,
    public note?: number,
    public typeNote?: TypeNote,
    public etudiants?: IEtudiant[] | null,
    public eCS?: IEC[] | null
  ) {}
}

export function getNoteIdentifier(note: INote): number | undefined {
  return note.id;
}
