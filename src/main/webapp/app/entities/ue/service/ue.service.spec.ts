import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IUE, UE } from '../ue.model';

import { UEService } from './ue.service';

describe('UE Service', () => {
  let service: UEService;
  let httpMock: HttpTestingController;
  let elemDefault: IUE;
  let expectedResult: IUE | IUE[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(UEService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      nomUE: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a UE', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new UE()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a UE', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nomUE: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a UE', () => {
      const patchObject = Object.assign(
        {
          nomUE: 'BBBBBB',
        },
        new UE()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of UE', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nomUE: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a UE', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addUEToCollectionIfMissing', () => {
      it('should add a UE to an empty array', () => {
        const uE: IUE = { id: 123 };
        expectedResult = service.addUEToCollectionIfMissing([], uE);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(uE);
      });

      it('should not add a UE to an array that contains it', () => {
        const uE: IUE = { id: 123 };
        const uECollection: IUE[] = [
          {
            ...uE,
          },
          { id: 456 },
        ];
        expectedResult = service.addUEToCollectionIfMissing(uECollection, uE);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a UE to an array that doesn't contain it", () => {
        const uE: IUE = { id: 123 };
        const uECollection: IUE[] = [{ id: 456 }];
        expectedResult = service.addUEToCollectionIfMissing(uECollection, uE);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(uE);
      });

      it('should add only unique UE to an array', () => {
        const uEArray: IUE[] = [{ id: 123 }, { id: 456 }, { id: 62578 }];
        const uECollection: IUE[] = [{ id: 123 }];
        expectedResult = service.addUEToCollectionIfMissing(uECollection, ...uEArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const uE: IUE = { id: 123 };
        const uE2: IUE = { id: 456 };
        expectedResult = service.addUEToCollectionIfMissing([], uE, uE2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(uE);
        expect(expectedResult).toContain(uE2);
      });

      it('should accept null and undefined values', () => {
        const uE: IUE = { id: 123 };
        expectedResult = service.addUEToCollectionIfMissing([], null, uE, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(uE);
      });

      it('should return initial array if no UE is added', () => {
        const uECollection: IUE[] = [{ id: 123 }];
        expectedResult = service.addUEToCollectionIfMissing(uECollection, undefined, null);
        expect(expectedResult).toEqual(uECollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
