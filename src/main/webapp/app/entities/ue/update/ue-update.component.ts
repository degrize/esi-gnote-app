import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IUE, UE } from '../ue.model';
import { UEService } from '../service/ue.service';

@Component({
  selector: 'jhi-ue-update',
  templateUrl: './ue-update.component.html',
})
export class UEUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nomUE: [],
  });

  constructor(protected uEService: UEService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ uE }) => {
      this.updateForm(uE);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const uE = this.createFromForm();
    if (uE.id !== undefined) {
      this.subscribeToSaveResponse(this.uEService.update(uE));
    } else {
      this.subscribeToSaveResponse(this.uEService.create(uE));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUE>>): void {
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

  protected updateForm(uE: IUE): void {
    this.editForm.patchValue({
      id: uE.id,
      nomUE: uE.nomUE,
    });
  }

  protected createFromForm(): IUE {
    return {
      ...new UE(),
      id: this.editForm.get(['id'])!.value,
      nomUE: this.editForm.get(['nomUE'])!.value,
    };
  }
}
