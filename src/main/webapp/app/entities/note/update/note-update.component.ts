import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { INote, Note } from '../note.model';
import { NoteService } from '../service/note.service';
import { IEtudiant } from 'app/entities/etudiant/etudiant.model';
import { EtudiantService } from 'app/entities/etudiant/service/etudiant.service';
import { IEC } from 'app/entities/ec/ec.model';
import { ECService } from 'app/entities/ec/service/ec.service';
import { TypeNote } from 'app/entities/enumerations/type-note.model';

@Component({
  selector: 'jhi-note-update',
  templateUrl: './note-update.component.html',
})
export class NoteUpdateComponent implements OnInit {
  isSaving = false;
  typeNoteValues = Object.keys(TypeNote);

  etudiantsSharedCollection: IEtudiant[] = [];
  eCSSharedCollection: IEC[] = [];

  editForm = this.fb.group({
    id: [],
    note: [null, [Validators.required]],
    typeNote: [null, [Validators.required]],
    etudiants: [],
    eCS: [],
  });

  constructor(
    protected noteService: NoteService,
    protected etudiantService: EtudiantService,
    protected eCService: ECService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ note }) => {
      this.updateForm(note);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const note = this.createFromForm();
    if (note.id !== undefined) {
      this.subscribeToSaveResponse(this.noteService.update(note));
    } else {
      this.subscribeToSaveResponse(this.noteService.create(note));
    }
  }

  trackEtudiantById(_index: number, item: IEtudiant): number {
    return item.id!;
  }

  trackECById(_index: number, item: IEC): number {
    return item.id!;
  }

  getSelectedEtudiant(option: IEtudiant, selectedVals?: IEtudiant[]): IEtudiant {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  getSelectedEC(option: IEC, selectedVals?: IEC[]): IEC {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INote>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(note: INote): void {
    this.editForm.patchValue({
      id: note.id,
      note: note.note,
      typeNote: note.typeNote,
      etudiants: note.etudiants,
      eCS: note.eCS,
    });

    this.etudiantsSharedCollection = this.etudiantService.addEtudiantToCollectionIfMissing(
      this.etudiantsSharedCollection,
      ...(note.etudiants ?? [])
    );
    this.eCSSharedCollection = this.eCService.addECToCollectionIfMissing(this.eCSSharedCollection, ...(note.eCS ?? []));
  }

  protected loadRelationshipsOptions(): void {
    this.etudiantService
      .query()
      .pipe(map((res: HttpResponse<IEtudiant[]>) => res.body ?? []))
      .pipe(
        map((etudiants: IEtudiant[]) =>
          this.etudiantService.addEtudiantToCollectionIfMissing(etudiants, ...(this.editForm.get('etudiants')!.value ?? []))
        )
      )
      .subscribe((etudiants: IEtudiant[]) => (this.etudiantsSharedCollection = etudiants));

    this.eCService
      .query()
      .pipe(map((res: HttpResponse<IEC[]>) => res.body ?? []))
      .pipe(map((eCS: IEC[]) => this.eCService.addECToCollectionIfMissing(eCS, ...(this.editForm.get('eCS')!.value ?? []))))
      .subscribe((eCS: IEC[]) => (this.eCSSharedCollection = eCS));
  }

  protected createFromForm(): INote {
    return {
      ...new Note(),
      id: this.editForm.get(['id'])!.value,
      note: this.editForm.get(['note'])!.value,
      typeNote: this.editForm.get(['typeNote'])!.value,
      etudiants: this.editForm.get(['etudiants'])!.value,
      eCS: this.editForm.get(['eCS'])!.value,
    };
  }
}
