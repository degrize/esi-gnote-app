import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IProfesseur, Professeur } from '../professeur.model';
import { ProfesseurService } from '../service/professeur.service';
import { IEtudiant } from 'app/entities/etudiant/etudiant.model';
import { EtudiantService } from 'app/entities/etudiant/service/etudiant.service';
import { IClasse } from 'app/entities/classe/classe.model';
import { ClasseService } from 'app/entities/classe/service/classe.service';
import { IEC } from 'app/entities/ec/ec.model';
import { ECService } from 'app/entities/ec/service/ec.service';

@Component({
  selector: 'jhi-professeur-update',
  templateUrl: './professeur-update.component.html',
})
export class ProfesseurUpdateComponent implements OnInit {
  isSaving = false;

  etudiantsSharedCollection: IEtudiant[] = [];
  classesSharedCollection: IClasse[] = [];
  eCSSharedCollection: IEC[] = [];

  editForm = this.fb.group({
    id: [],
    nomProf: [null, [Validators.required]],
    prenomProf: [null, [Validators.required]],
    contactProf: [],
    etudiants: [],
    classes: [],
    eCS: [],
  });

  constructor(
    protected professeurService: ProfesseurService,
    protected etudiantService: EtudiantService,
    protected classeService: ClasseService,
    protected eCService: ECService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ professeur }) => {
      this.updateForm(professeur);

      this.loadRelationshipsOptions();
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

  trackEtudiantById(_index: number, item: IEtudiant): number {
    return item.id!;
  }

  trackClasseById(_index: number, item: IClasse): number {
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

  getSelectedClasse(option: IClasse, selectedVals?: IClasse[]): IClasse {
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
      etudiants: professeur.etudiants,
      classes: professeur.classes,
      eCS: professeur.eCS,
    });

    this.etudiantsSharedCollection = this.etudiantService.addEtudiantToCollectionIfMissing(
      this.etudiantsSharedCollection,
      ...(professeur.etudiants ?? [])
    );
    this.classesSharedCollection = this.classeService.addClasseToCollectionIfMissing(
      this.classesSharedCollection,
      ...(professeur.classes ?? [])
    );
    this.eCSSharedCollection = this.eCService.addECToCollectionIfMissing(this.eCSSharedCollection, ...(professeur.eCS ?? []));
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

    this.classeService
      .query()
      .pipe(map((res: HttpResponse<IClasse[]>) => res.body ?? []))
      .pipe(
        map((classes: IClasse[]) =>
          this.classeService.addClasseToCollectionIfMissing(classes, ...(this.editForm.get('classes')!.value ?? []))
        )
      )
      .subscribe((classes: IClasse[]) => (this.classesSharedCollection = classes));

    this.eCService
      .query()
      .pipe(map((res: HttpResponse<IEC[]>) => res.body ?? []))
      .pipe(map((eCS: IEC[]) => this.eCService.addECToCollectionIfMissing(eCS, ...(this.editForm.get('eCS')!.value ?? []))))
      .subscribe((eCS: IEC[]) => (this.eCSSharedCollection = eCS));
  }

  protected createFromForm(): IProfesseur {
    return {
      ...new Professeur(),
      id: this.editForm.get(['id'])!.value,
      nomProf: this.editForm.get(['nomProf'])!.value,
      prenomProf: this.editForm.get(['prenomProf'])!.value,
      contactProf: this.editForm.get(['contactProf'])!.value,
      etudiants: this.editForm.get(['etudiants'])!.value,
      classes: this.editForm.get(['classes'])!.value,
      eCS: this.editForm.get(['eCS'])!.value,
    };
  }
}
