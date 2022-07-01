import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEC } from '../ec.model';

@Component({
  selector: 'jhi-ec-detail',
  templateUrl: './ec-detail.component.html',
})
export class ECDetailComponent implements OnInit {
  eC: IEC | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ eC }) => {
      this.eC = eC;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
