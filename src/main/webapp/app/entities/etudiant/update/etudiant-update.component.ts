import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IEtudiant, Etudiant } from '../etudiant.model';
import { EtudiantService } from '../service/etudiant.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IEncadreur } from 'app/entities/encadreur/encadreur.model';
import { EncadreurService } from 'app/entities/encadreur/service/encadreur.service';

@Component({
  selector: 'jhi-etudiant-update',
  templateUrl: './etudiant-update.component.html',
})
export class EtudiantUpdateComponent implements OnInit {
  isSaving = false;

  encadreursSharedCollection: IEncadreur[] = [];

  editForm = this.fb.group({
    id: [],
    matriculeET: [null, [Validators.required]],
    nomET: [null, [Validators.required]],
    prenomET: [null, [Validators.required]],
    photo: [],
    photoContentType: [],
    numeroParent: [],
    numeroTuteur: [],
    contactET: [],
    encadreur: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected etudiantService: EtudiantService,
    protected encadreurService: EncadreurService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ etudiant }) => {
      this.updateForm(etudiant);

      this.loadRelationshipsOptions();
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(
          new EventWithContent<AlertError>('gnoteApplicationApp.error', { ...err, key: 'error.file.' + err.key })
        ),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const etudiant = this.createFromForm();
    if (etudiant.id !== undefined) {
      this.subscribeToSaveResponse(this.etudiantService.update(etudiant));
    } else {
      this.subscribeToSaveResponse(this.etudiantService.create(etudiant));
    }
  }

  trackEncadreurById(_index: number, item: IEncadreur): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEtudiant>>): void {
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

  protected updateForm(etudiant: IEtudiant): void {
    this.editForm.patchValue({
      id: etudiant.id,
      matriculeET: etudiant.matriculeET,
      nomET: etudiant.nomET,
      prenomET: etudiant.prenomET,
      photo: etudiant.photo,
      photoContentType: etudiant.photoContentType,
      numeroParent: etudiant.numeroParent,
      numeroTuteur: etudiant.numeroTuteur,
      contactET: etudiant.contactET,
      encadreur: etudiant.encadreur,
    });

    this.encadreursSharedCollection = this.encadreurService.addEncadreurToCollectionIfMissing(
      this.encadreursSharedCollection,
      etudiant.encadreur
    );
  }

  protected loadRelationshipsOptions(): void {
    this.encadreurService
      .query()
      .pipe(map((res: HttpResponse<IEncadreur[]>) => res.body ?? []))
      .pipe(
        map((encadreurs: IEncadreur[]) =>
          this.encadreurService.addEncadreurToCollectionIfMissing(encadreurs, this.editForm.get('encadreur')!.value)
        )
      )
      .subscribe((encadreurs: IEncadreur[]) => (this.encadreursSharedCollection = encadreurs));
  }

  protected createFromForm(): IEtudiant {
    return {
      ...new Etudiant(),
      id: this.editForm.get(['id'])!.value,
      matriculeET: this.editForm.get(['matriculeET'])!.value,
      nomET: this.editForm.get(['nomET'])!.value,
      prenomET: this.editForm.get(['prenomET'])!.value,
      photoContentType: this.editForm.get(['photoContentType'])!.value,
      photo: this.editForm.get(['photo'])!.value,
      numeroParent: this.editForm.get(['numeroParent'])!.value,
      numeroTuteur: this.editForm.get(['numeroTuteur'])!.value,
      contactET: this.editForm.get(['contactET'])!.value,
      encadreur: this.editForm.get(['encadreur'])!.value,
    };
  }
}
