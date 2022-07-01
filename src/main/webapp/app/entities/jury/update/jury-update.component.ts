import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IJury, Jury } from '../jury.model';
import { JuryService } from '../service/jury.service';

@Component({
  selector: 'jhi-jury-update',
  templateUrl: './jury-update.component.html',
})
export class JuryUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    presidentJury: [null, [Validators.required]],
  });

  constructor(protected juryService: JuryService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ jury }) => {
      this.updateForm(jury);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const jury = this.createFromForm();
    if (jury.id !== undefined) {
      this.subscribeToSaveResponse(this.juryService.update(jury));
    } else {
      this.subscribeToSaveResponse(this.juryService.create(jury));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IJury>>): void {
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

  protected updateForm(jury: IJury): void {
    this.editForm.patchValue({
      id: jury.id,
      presidentJury: jury.presidentJury,
    });
  }

  protected createFromForm(): IJury {
    return {
      ...new Jury(),
      id: this.editForm.get(['id'])!.value,
      presidentJury: this.editForm.get(['presidentJury'])!.value,
    };
  }
}
