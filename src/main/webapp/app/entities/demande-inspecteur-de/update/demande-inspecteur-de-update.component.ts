import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IDemandeInspecteurDE, DemandeInspecteurDE } from '../demande-inspecteur-de.model';
import { DemandeInspecteurDEService } from '../service/demande-inspecteur-de.service';

@Component({
  selector: 'jhi-demande-inspecteur-de-update',
  templateUrl: './demande-inspecteur-de-update.component.html',
})
export class DemandeInspecteurDEUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    message: [null, [Validators.required]],
  });

  constructor(
    protected demandeInspecteurDEService: DemandeInspecteurDEService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ demandeInspecteurDE }) => {
      this.updateForm(demandeInspecteurDE);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const demandeInspecteurDE = this.createFromForm();
    if (demandeInspecteurDE.id !== undefined) {
      this.subscribeToSaveResponse(this.demandeInspecteurDEService.update(demandeInspecteurDE));
    } else {
      this.subscribeToSaveResponse(this.demandeInspecteurDEService.create(demandeInspecteurDE));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDemandeInspecteurDE>>): void {
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

  protected updateForm(demandeInspecteurDE: IDemandeInspecteurDE): void {
    this.editForm.patchValue({
      id: demandeInspecteurDE.id,
      message: demandeInspecteurDE.message,
    });
  }

  protected createFromForm(): IDemandeInspecteurDE {
    return {
      ...new DemandeInspecteurDE(),
      id: this.editForm.get(['id'])!.value,
      message: this.editForm.get(['message'])!.value,
    };
  }
}
