import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IDemandeInspecteurEtudiant, DemandeInspecteurEtudiant } from '../demande-inspecteur-etudiant.model';
import { DemandeInspecteurEtudiantService } from '../service/demande-inspecteur-etudiant.service';

@Component({
  selector: 'jhi-demande-inspecteur-etudiant-update',
  templateUrl: './demande-inspecteur-etudiant-update.component.html',
})
export class DemandeInspecteurEtudiantUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    message: [null, [Validators.required]],
  });

  constructor(
    protected demandeInspecteurEtudiantService: DemandeInspecteurEtudiantService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ demandeInspecteurEtudiant }) => {
      this.updateForm(demandeInspecteurEtudiant);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const demandeInspecteurEtudiant = this.createFromForm();
    if (demandeInspecteurEtudiant.id !== undefined) {
      this.subscribeToSaveResponse(this.demandeInspecteurEtudiantService.update(demandeInspecteurEtudiant));
    } else {
      this.subscribeToSaveResponse(this.demandeInspecteurEtudiantService.create(demandeInspecteurEtudiant));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDemandeInspecteurEtudiant>>): void {
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

  protected updateForm(demandeInspecteurEtudiant: IDemandeInspecteurEtudiant): void {
    this.editForm.patchValue({
      id: demandeInspecteurEtudiant.id,
      message: demandeInspecteurEtudiant.message,
    });
  }

  protected createFromForm(): IDemandeInspecteurEtudiant {
    return {
      ...new DemandeInspecteurEtudiant(),
      id: this.editForm.get(['id'])!.value,
      message: this.editForm.get(['message'])!.value,
    };
  }
}
