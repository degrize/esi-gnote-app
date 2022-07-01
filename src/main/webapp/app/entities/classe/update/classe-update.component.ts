import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IClasse, Classe } from '../classe.model';
import { ClasseService } from '../service/classe.service';
import { IFiliere } from 'app/entities/filiere/filiere.model';
import { FiliereService } from 'app/entities/filiere/service/filiere.service';
import { IEC } from 'app/entities/ec/ec.model';
import { ECService } from 'app/entities/ec/service/ec.service';

@Component({
  selector: 'jhi-classe-update',
  templateUrl: './classe-update.component.html',
})
export class ClasseUpdateComponent implements OnInit {
  isSaving = false;

  filieresSharedCollection: IFiliere[] = [];
  eCSSharedCollection: IEC[] = [];

  editForm = this.fb.group({
    id: [],
    nomClasse: [null, [Validators.required]],
    filiere: [],
    eCS: [],
  });

  constructor(
    protected classeService: ClasseService,
    protected filiereService: FiliereService,
    protected eCService: ECService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ classe }) => {
      this.updateForm(classe);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const classe = this.createFromForm();
    if (classe.id !== undefined) {
      this.subscribeToSaveResponse(this.classeService.update(classe));
    } else {
      this.subscribeToSaveResponse(this.classeService.create(classe));
    }
  }

  trackFiliereById(_index: number, item: IFiliere): number {
    return item.id!;
  }

  trackECById(_index: number, item: IEC): number {
    return item.id!;
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClasse>>): void {
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

  protected updateForm(classe: IClasse): void {
    this.editForm.patchValue({
      id: classe.id,
      nomClasse: classe.nomClasse,
      filiere: classe.filiere,
      eCS: classe.eCS,
    });

    this.filieresSharedCollection = this.filiereService.addFiliereToCollectionIfMissing(this.filieresSharedCollection, classe.filiere);
    this.eCSSharedCollection = this.eCService.addECToCollectionIfMissing(this.eCSSharedCollection, ...(classe.eCS ?? []));
  }

  protected loadRelationshipsOptions(): void {
    this.filiereService
      .query()
      .pipe(map((res: HttpResponse<IFiliere[]>) => res.body ?? []))
      .pipe(
        map((filieres: IFiliere[]) => this.filiereService.addFiliereToCollectionIfMissing(filieres, this.editForm.get('filiere')!.value))
      )
      .subscribe((filieres: IFiliere[]) => (this.filieresSharedCollection = filieres));

    this.eCService
      .query()
      .pipe(map((res: HttpResponse<IEC[]>) => res.body ?? []))
      .pipe(map((eCS: IEC[]) => this.eCService.addECToCollectionIfMissing(eCS, ...(this.editForm.get('eCS')!.value ?? []))))
      .subscribe((eCS: IEC[]) => (this.eCSSharedCollection = eCS));
  }

  protected createFromForm(): IClasse {
    return {
      ...new Classe(),
      id: this.editForm.get(['id'])!.value,
      nomClasse: this.editForm.get(['nomClasse'])!.value,
      filiere: this.editForm.get(['filiere'])!.value,
      eCS: this.editForm.get(['eCS'])!.value,
    };
  }
}
