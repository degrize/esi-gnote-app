import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ECService } from '../service/ec.service';
import { IEC, EC } from '../ec.model';
import { IUE } from 'app/entities/ue/ue.model';
import { UEService } from 'app/entities/ue/service/ue.service';

import { ECUpdateComponent } from './ec-update.component';

describe('EC Management Update Component', () => {
  let comp: ECUpdateComponent;
  let fixture: ComponentFixture<ECUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let eCService: ECService;
  let uEService: UEService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ECUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ECUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ECUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    eCService = TestBed.inject(ECService);
    uEService = TestBed.inject(UEService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call UE query and add missing value', () => {
      const eC: IEC = { id: 456 };
      const uE: IUE = { id: 5223 };
      eC.uE = uE;

      const uECollection: IUE[] = [{ id: 77953 }];
      jest.spyOn(uEService, 'query').mockReturnValue(of(new HttpResponse({ body: uECollection })));
      const additionalUES = [uE];
      const expectedCollection: IUE[] = [...additionalUES, ...uECollection];
      jest.spyOn(uEService, 'addUEToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ eC });
      comp.ngOnInit();

      expect(uEService.query).toHaveBeenCalled();
      expect(uEService.addUEToCollectionIfMissing).toHaveBeenCalledWith(uECollection, ...additionalUES);
      expect(comp.uESSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const eC: IEC = { id: 456 };
      const uE: IUE = { id: 47535 };
      eC.uE = uE;

      activatedRoute.data = of({ eC });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(eC));
      expect(comp.uESSharedCollection).toContain(uE);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<EC>>();
      const eC = { id: 123 };
      jest.spyOn(eCService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ eC });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: eC }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(eCService.update).toHaveBeenCalledWith(eC);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<EC>>();
      const eC = new EC();
      jest.spyOn(eCService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ eC });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: eC }));
      saveSubject.complete();

      // THEN
      expect(eCService.create).toHaveBeenCalledWith(eC);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<EC>>();
      const eC = { id: 123 };
      jest.spyOn(eCService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ eC });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(eCService.update).toHaveBeenCalledWith(eC);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackUEById', () => {
      it('Should return tracked UE primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackUEById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
