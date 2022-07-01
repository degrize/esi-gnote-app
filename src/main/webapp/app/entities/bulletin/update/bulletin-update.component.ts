import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IBulletin, Bulletin } from '../bulletin.model';
import { BulletinService } from '../service/bulletin.service';

@Component({
  selector: 'jhi-bulletin-update',
  templateUrl: './bulletin-update.component.html',
})
export class BulletinUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    signatureDG: [null, [Validators.required]],
    observation: [null, [Validators.required]],
  });

  constructor(protected bulletinService: BulletinService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bulletin }) => {
      this.updateForm(bulletin);
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
    });
  }

  protected createFromForm(): IBulletin {
    return {
      ...new Bulletin(),
      id: this.editForm.get(['id'])!.value,
      signatureDG: this.editForm.get(['signatureDG'])!.value,
      observation: this.editForm.get(['observation'])!.value,
    };
  }
}
