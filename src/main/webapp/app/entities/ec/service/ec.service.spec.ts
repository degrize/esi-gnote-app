import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEC, EC } from '../ec.model';

import { ECService } from './ec.service';

describe('EC Service', () => {
  let service: ECService;
  let httpMock: HttpTestingController;
  let elemDefault: IEC;
  let expectedResult: IEC | IEC[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ECService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      nomEC: 'AAAAAAA',
      coeff: 0,
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

    it('should create a EC', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new EC()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a EC', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nomEC: 'BBBBBB',
          coeff: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a EC', () => {
      const patchObject = Object.assign(
        {
          nomEC: 'BBBBBB',
        },
        new EC()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of EC', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nomEC: 'BBBBBB',
          coeff: 1,
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

    it('should delete a EC', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addECToCollectionIfMissing', () => {
      it('should add a EC to an empty array', () => {
        const eC: IEC = { id: 123 };
        expectedResult = service.addECToCollectionIfMissing([], eC);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(eC);
      });

      it('should not add a EC to an array that contains it', () => {
        const eC: IEC = { id: 123 };
        const eCCollection: IEC[] = [
          {
            ...eC,
          },
          { id: 456 },
        ];
        expectedResult = service.addECToCollectionIfMissing(eCCollection, eC);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a EC to an array that doesn't contain it", () => {
        const eC: IEC = { id: 123 };
        const eCCollection: IEC[] = [{ id: 456 }];
        expectedResult = service.addECToCollectionIfMissing(eCCollection, eC);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(eC);
      });

      it('should add only unique EC to an array', () => {
        const eCArray: IEC[] = [{ id: 123 }, { id: 456 }, { id: 29474 }];
        const eCCollection: IEC[] = [{ id: 123 }];
        expectedResult = service.addECToCollectionIfMissing(eCCollection, ...eCArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const eC: IEC = { id: 123 };
        const eC2: IEC = { id: 456 };
        expectedResult = service.addECToCollectionIfMissing([], eC, eC2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(eC);
        expect(expectedResult).toContain(eC2);
      });

      it('should accept null and undefined values', () => {
        const eC: IEC = { id: 123 };
        expectedResult = service.addECToCollectionIfMissing([], null, eC, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(eC);
      });

      it('should return initial array if no EC is added', () => {
        const eCCollection: IEC[] = [{ id: 123 }];
        expectedResult = service.addECToCollectionIfMissing(eCCollection, undefined, null);
        expect(expectedResult).toEqual(eCCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
