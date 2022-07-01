import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IUE, UE } from '../ue.model';
import { UEService } from '../service/ue.service';

@Injectable({ providedIn: 'root' })
export class UERoutingResolveService implements Resolve<IUE> {
  constructor(protected service: UEService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUE> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((uE: HttpResponse<UE>) => {
          if (uE.body) {
            return of(uE.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new UE());
  }
}
