import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IEC, EC } from '../ec.model';
import { ECService } from '../service/ec.service';

@Component({
  selector: 'jhi-ec-update',
  templateUrl: './ec-update.component.html',
})
export class ECUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nomEC: [null, [Validators.required]],
    coeff: [null, [Validators.required]],
  });

  constructor(protected eCService: ECService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ eC }) => {
      this.updateForm(eC);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const eC = this.createFromForm();
    if (eC.id !== undefined) {
      this.subscribeToSaveResponse(this.eCService.update(eC));
    } else {
      this.subscribeToSaveResponse(this.eCService.create(eC));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEC>>): void {
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

  protected updateForm(eC: IEC): void {
    this.editForm.patchValue({
      id: eC.id,
      nomEC: eC.nomEC,
      coeff: eC.coeff,
    });
  }

  protected createFromForm(): IEC {
    return {
      ...new EC(),
      id: this.editForm.get(['id'])!.value,
      nomEC: this.editForm.get(['nomEC'])!.value,
      coeff: this.editForm.get(['coeff'])!.value,
    };
  }
}
