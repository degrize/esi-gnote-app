import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEC, getECIdentifier } from '../ec.model';

export type EntityResponseType = HttpResponse<IEC>;
export type EntityArrayResponseType = HttpResponse<IEC[]>;

@Injectable({ providedIn: 'root' })
export class ECService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/ecs');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(eC: IEC): Observable<EntityResponseType> {
    return this.http.post<IEC>(this.resourceUrl, eC, { observe: 'response' });
  }

  update(eC: IEC): Observable<EntityResponseType> {
    return this.http.put<IEC>(`${this.resourceUrl}/${getECIdentifier(eC) as number}`, eC, { observe: 'response' });
  }

  partialUpdate(eC: IEC): Observable<EntityResponseType> {
    return this.http.patch<IEC>(`${this.resourceUrl}/${getECIdentifier(eC) as number}`, eC, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEC>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEC[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addECToCollectionIfMissing(eCCollection: IEC[], ...eCSToCheck: (IEC | null | undefined)[]): IEC[] {
    const eCS: IEC[] = eCSToCheck.filter(isPresent);
    if (eCS.length > 0) {
      const eCCollectionIdentifiers = eCCollection.map(eCItem => getECIdentifier(eCItem)!);
      const eCSToAdd = eCS.filter(eCItem => {
        const eCIdentifier = getECIdentifier(eCItem);
        if (eCIdentifier == null || eCCollectionIdentifiers.includes(eCIdentifier)) {
          return false;
        }
        eCCollectionIdentifiers.push(eCIdentifier);
        return true;
      });
      return [...eCSToAdd, ...eCCollection];
    }
    return eCCollection;
  }
}
