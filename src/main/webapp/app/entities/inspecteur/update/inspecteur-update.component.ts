import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IInspecteur, Inspecteur } from '../inspecteur.model';
import { InspecteurService } from '../service/inspecteur.service';

@Component({
  selector: 'jhi-inspecteur-update',
  templateUrl: './inspecteur-update.component.html',
})
export class InspecteurUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nomInspecteur: [null, [Validators.required]],
    prenomInspecteur: [],
    contactInspecteur: [],
  });

  constructor(protected inspecteurService: InspecteurService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ inspecteur }) => {
      this.updateForm(inspecteur);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const inspecteur = this.createFromForm();
    if (inspecteur.id !== undefined) {
      this.subscribeToSaveResponse(this.inspecteurService.update(inspecteur));
    } else {
      this.subscribeToSaveResponse(this.inspecteurService.create(inspecteur));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInspecteur>>): void {
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

  protected updateForm(inspecteur: IInspecteur): void {
    this.editForm.patchValue({
      id: inspecteur.id,
      nomInspecteur: inspecteur.nomInspecteur,
      prenomInspecteur: inspecteur.prenomInspecteur,
      contactInspecteur: inspecteur.contactInspecteur,
    });
  }

  protected createFromForm(): IInspecteur {
    return {
      ...new Inspecteur(),
      id: this.editForm.get(['id'])!.value,
      nomInspecteur: this.editForm.get(['nomInspecteur'])!.value,
      prenomInspecteur: this.editForm.get(['prenomInspecteur'])!.value,
      contactInspecteur: this.editForm.get(['contactInspecteur'])!.value,
    };
  }
}
