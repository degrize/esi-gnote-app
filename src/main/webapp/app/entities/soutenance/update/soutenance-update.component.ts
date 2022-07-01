import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ISoutenance, Soutenance } from '../soutenance.model';
import { SoutenanceService } from '../service/soutenance.service';
import { TypeSoutenance } from 'app/entities/enumerations/type-soutenance.model';

@Component({
  selector: 'jhi-soutenance-update',
  templateUrl: './soutenance-update.component.html',
})
export class SoutenanceUpdateComponent implements OnInit {
  isSaving = false;
  typeSoutenanceValues = Object.keys(TypeSoutenance);

  editForm = this.fb.group({
    id: [],
    typeSout: [null, [Validators.required]],
    themeSout: [null, [Validators.required]],
    noteSout: [null, [Validators.required]],
  });

  constructor(protected soutenanceService: SoutenanceService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ soutenance }) => {
      this.updateForm(soutenance);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const soutenance = this.createFromForm();
    if (soutenance.id !== undefined) {
      this.subscribeToSaveResponse(this.soutenanceService.update(soutenance));
    } else {
      this.subscribeToSaveResponse(this.soutenanceService.create(soutenance));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISoutenance>>): void {
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

  protected updateForm(soutenance: ISoutenance): void {
    this.editForm.patchValue({
      id: soutenance.id,
      typeSout: soutenance.typeSout,
      themeSout: soutenance.themeSout,
      noteSout: soutenance.noteSout,
    });
  }

  protected createFromForm(): ISoutenance {
    return {
      ...new Soutenance(),
      id: this.editForm.get(['id'])!.value,
      typeSout: this.editForm.get(['typeSout'])!.value,
      themeSout: this.editForm.get(['themeSout'])!.value,
      noteSout: this.editForm.get(['noteSout'])!.value,
    };
  }
}
