import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IProfesseur, Professeur } from '../professeur.model';
import { ProfesseurService } from '../service/professeur.service';

@Component({
  selector: 'jhi-professeur-update',
  templateUrl: './professeur-update.component.html',
})
export class ProfesseurUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nomProf: [null, [Validators.required]],
    prenomProf: [null, [Validators.required]],
    contactProf: [],
  });

  constructor(protected professeurService: ProfesseurService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ professeur }) => {
      this.updateForm(professeur);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const professeur = this.createFromForm();
    if (professeur.id !== undefined) {
      this.subscribeToSaveResponse(this.professeurService.update(professeur));
    } else {
      this.subscribeToSaveResponse(this.professeurService.create(professeur));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProfesseur>>): void {
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

  protected updateForm(professeur: IProfesseur): void {
    this.editForm.patchValue({
      id: professeur.id,
      nomProf: professeur.nomProf,
      prenomProf: professeur.prenomProf,
      contactProf: professeur.contactProf,
    });
  }

  protected createFromForm(): IProfesseur {
    return {
      ...new Professeur(),
      id: this.editForm.get(['id'])!.value,
      nomProf: this.editForm.get(['nomProf'])!.value,
      prenomProf: this.editForm.get(['prenomProf'])!.value,
      contactProf: this.editForm.get(['contactProf'])!.value,
    };
  }
}
