import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IBulletin, Bulletin } from '../bulletin.model';
import { BulletinService } from '../service/bulletin.service';
import { IEtudiant } from 'app/entities/etudiant/etudiant.model';
import { EtudiantService } from 'app/entities/etudiant/service/etudiant.service';
import { IProfesseur } from 'app/entities/professeur/professeur.model';
import { ProfesseurService } from 'app/entities/professeur/service/professeur.service';

@Component({
  selector: 'jhi-bulletin-update',
  templateUrl: './bulletin-update.component.html',
})
export class BulletinUpdateComponent implements OnInit {
  isSaving = false;

  etudiantsSharedCollection: IEtudiant[] = [];
  professeursSharedCollection: IProfesseur[] = [];

  editForm = this.fb.group({
    id: [],
    signatureDG: [null, [Validators.required]],
    observation: [null, [Validators.required]],
    etudiant: [],
    professeurs: [],
  });

  constructor(
    protected bulletinService: BulletinService,
    protected etudiantService: EtudiantService,
    protected professeurService: ProfesseurService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bulletin }) => {
      this.updateForm(bulletin);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const bulletin = this.createFromForm();
    if (bulletin.id !== undefined) {
      this.subscribeToSaveResponse(this.bulletinService.update(bulletin));
    } else {
      this.subscribeToSaveResponse(this.bulletinService.create(bulletin));
    }
  }

  trackEtudiantById(_index: number, item: IEtudiant): number {
    return item.id!;
  }

  trackProfesseurById(_index: number, item: IProfesseur): number {
    return item.id!;
  }

  getSelectedProfesseur(option: IProfesseur, selectedVals?: IProfesseur[]): IProfesseur {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBulletin>>): void {
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

  protected updateForm(bulletin: IBulletin): void {
    this.editForm.patchValue({
      id: bulletin.id,
      signatureDG: bulletin.signatureDG,
      observation: bulletin.observation,
      etudiant: bulletin.etudiant,
      professeurs: bulletin.professeurs,
    });

    this.etudiantsSharedCollection = this.etudiantService.addEtudiantToCollectionIfMissing(
      this.etudiantsSharedCollection,
      bulletin.etudiant
    );
    this.professeursSharedCollection = this.professeurService.addProfesseurToCollectionIfMissing(
      this.professeursSharedCollection,
      ...(bulletin.professeurs ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.etudiantService
      .query()
      .pipe(map((res: HttpResponse<IEtudiant[]>) => res.body ?? []))
      .pipe(
        map((etudiants: IEtudiant[]) =>
          this.etudiantService.addEtudiantToCollectionIfMissing(etudiants, this.editForm.get('etudiant')!.value)
        )
      )
      .subscribe((etudiants: IEtudiant[]) => (this.etudiantsSharedCollection = etudiants));

    this.professeurService
      .query()
      .pipe(map((res: HttpResponse<IProfesseur[]>) => res.body ?? []))
      .pipe(
        map((professeurs: IProfesseur[]) =>
          this.professeurService.addProfesseurToCollectionIfMissing(professeurs, ...(this.editForm.get('professeurs')!.value ?? []))
        )
      )
      .subscribe((professeurs: IProfesseur[]) => (this.professeursSharedCollection = professeurs));
  }

  protected createFromForm(): IBulletin {
    return {
      ...new Bulletin(),
      id: this.editForm.get(['id'])!.value,
      signatureDG: this.editForm.get(['signatureDG'])!.value,
      observation: this.editForm.get(['observation'])!.value,
      etudiant: this.editForm.get(['etudiant'])!.value,
      professeurs: this.editForm.get(['professeurs'])!.value,
    };
  }
}
