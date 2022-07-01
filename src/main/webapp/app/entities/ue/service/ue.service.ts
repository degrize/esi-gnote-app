import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IUE, getUEIdentifier } from '../ue.model';

export type EntityResponseType = HttpResponse<IUE>;
export type EntityArrayResponseType = HttpResponse<IUE[]>;

@Injectable({ providedIn: 'root' })
export class UEService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/ues');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(uE: IUE): Observable<EntityResponseType> {
    return this.http.post<IUE>(this.resourceUrl, uE, { observe: 'response' });
  }

  update(uE: IUE): Observable<EntityResponseType> {
    return this.http.put<IUE>(`${this.resourceUrl}/${getUEIdentifier(uE) as number}`, uE, { observe: 'response' });
  }

  partialUpdate(uE: IUE): Observable<EntityResponseType> {
    return this.http.patch<IUE>(`${this.resourceUrl}/${getUEIdentifier(uE) as number}`, uE, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUE>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUE[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addUEToCollectionIfMissing(uECollection: IUE[], ...uESToCheck: (IUE | null | undefined)[]): IUE[] {
    const uES: IUE[] = uESToCheck.filter(isPresent);
    if (uES.length > 0) {
      const uECollectionIdentifiers = uECollection.map(uEItem => getUEIdentifier(uEItem)!);
      const uESToAdd = uES.filter(uEItem => {
        const uEIdentifier = getUEIdentifier(uEItem);
        if (uEIdentifier == null || uECollectionIdentifiers.includes(uEIdentifier)) {
          return false;
        }
        uECollectionIdentifiers.push(uEIdentifier);
        return true;
      });
      return [...uESToAdd, ...uECollection];
    }
    return uECollection;
  }
}
