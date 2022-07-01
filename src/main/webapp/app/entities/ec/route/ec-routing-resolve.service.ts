import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEC, EC } from '../ec.model';
import { ECService } from '../service/ec.service';

@Injectable({ providedIn: 'root' })
export class ECRoutingResolveService implements Resolve<IEC> {
  constructor(protected service: ECService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEC> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((eC: HttpResponse<EC>) => {
          if (eC.body) {
            return of(eC.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EC());
  }
}
