import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUE } from '../ue.model';

@Component({
  selector: 'jhi-ue-detail',
  templateUrl: './ue-detail.component.html',
})
export class UEDetailComponent implements OnInit {
  uE: IUE | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ uE }) => {
      this.uE = uE;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
