import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IPlanche, Planche } from '../planche.model';
import { PlancheService } from '../service/planche.service';

@Component({
  selector: 'jhi-planche-update',
  templateUrl: './planche-update.component.html',
})
export class PlancheUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    observation: [null, [Validators.required]],
  });

  constructor(protected plancheService: PlancheService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ planche }) => {
      this.updateForm(planche);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const planche = this.createFromForm();
    if (planche.id !== undefined) {
      this.subscribeToSaveResponse(this.plancheService.update(planche));
    } else {
      this.subscribeToSaveResponse(this.plancheService.create(planche));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlanche>>): void {
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

  protected updateForm(planche: IPlanche): void {
    this.editForm.patchValue({
      id: planche.id,
      observation: planche.observation,
    });
  }

  protected createFromForm(): IPlanche {
    return {
      ...new Planche(),
      id: this.editForm.get(['id'])!.value,
      observation: this.editForm.get(['observation'])!.value,
    };
  }
}
