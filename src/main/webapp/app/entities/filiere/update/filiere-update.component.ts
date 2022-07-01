import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IFiliere, Filiere } from '../filiere.model';
import { FiliereService } from '../service/filiere.service';
import { ICycle } from 'app/entities/cycle/cycle.model';
import { CycleService } from 'app/entities/cycle/service/cycle.service';
import { IUE } from 'app/entities/ue/ue.model';
import { UEService } from 'app/entities/ue/service/ue.service';

@Component({
  selector: 'jhi-filiere-update',
  templateUrl: './filiere-update.component.html',
})
export class FiliereUpdateComponent implements OnInit {
  isSaving = false;

  cyclesSharedCollection: ICycle[] = [];
  uESSharedCollection: IUE[] = [];

  editForm = this.fb.group({
    id: [],
    nomFiliere: [null, [Validators.required]],
    etudiant: [],
    uES: [],
  });

  constructor(
    protected filiereService: FiliereService,
    protected cycleService: CycleService,
    protected uEService: UEService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ filiere }) => {
      this.updateForm(filiere);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const filiere = this.createFromForm();
    if (filiere.id !== undefined) {
      this.subscribeToSaveResponse(this.filiereService.update(filiere));
    } else {
      this.subscribeToSaveResponse(this.filiereService.create(filiere));
    }
  }

  trackCycleById(_index: number, item: ICycle): number {
    return item.id!;
  }

  trackUEById(_index: number, item: IUE): number {
    return item.id!;
  }

  getSelectedUE(option: IUE, selectedVals?: IUE[]): IUE {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFiliere>>): void {
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

  protected updateForm(filiere: IFiliere): void {
    this.editForm.patchValue({
      id: filiere.id,
      nomFiliere: filiere.nomFiliere,
      etudiant: filiere.etudiant,
      uES: filiere.uES,
    });

    this.cyclesSharedCollection = this.cycleService.addCycleToCollectionIfMissing(this.cyclesSharedCollection, filiere.etudiant);
    this.uESSharedCollection = this.uEService.addUEToCollectionIfMissing(this.uESSharedCollection, ...(filiere.uES ?? []));
  }

  protected loadRelationshipsOptions(): void {
    this.cycleService
      .query()
      .pipe(map((res: HttpResponse<ICycle[]>) => res.body ?? []))
      .pipe(map((cycles: ICycle[]) => this.cycleService.addCycleToCollectionIfMissing(cycles, this.editForm.get('etudiant')!.value)))
      .subscribe((cycles: ICycle[]) => (this.cyclesSharedCollection = cycles));

    this.uEService
      .query()
      .pipe(map((res: HttpResponse<IUE[]>) => res.body ?? []))
      .pipe(map((uES: IUE[]) => this.uEService.addUEToCollectionIfMissing(uES, ...(this.editForm.get('uES')!.value ?? []))))
      .subscribe((uES: IUE[]) => (this.uESSharedCollection = uES));
  }

  protected createFromForm(): IFiliere {
    return {
      ...new Filiere(),
      id: this.editForm.get(['id'])!.value,
      nomFiliere: this.editForm.get(['nomFiliere'])!.value,
      etudiant: this.editForm.get(['etudiant'])!.value,
      uES: this.editForm.get(['uES'])!.value,
    };
  }
}
