import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FiliereService } from '../service/filiere.service';
import { IFiliere, Filiere } from '../filiere.model';
import { ICycle } from 'app/entities/cycle/cycle.model';
import { CycleService } from 'app/entities/cycle/service/cycle.service';
import { IUE } from 'app/entities/ue/ue.model';
import { UEService } from 'app/entities/ue/service/ue.service';

import { FiliereUpdateComponent } from './filiere-update.component';

describe('Filiere Management Update Component', () => {
  let comp: FiliereUpdateComponent;
  let fixture: ComponentFixture<FiliereUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let filiereService: FiliereService;
  let cycleService: CycleService;
  let uEService: UEService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FiliereUpdateComponent],
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
      .overrideTemplate(FiliereUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FiliereUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    filiereService = TestBed.inject(FiliereService);
    cycleService = TestBed.inject(CycleService);
    uEService = TestBed.inject(UEService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Cycle query and add missing value', () => {
      const filiere: IFiliere = { id: 456 };
      const etudiant: ICycle = { id: 63280 };
      filiere.etudiant = etudiant;

      const cycleCollection: ICycle[] = [{ id: 56120 }];
      jest.spyOn(cycleService, 'query').mockReturnValue(of(new HttpResponse({ body: cycleCollection })));
      const additionalCycles = [etudiant];
      const expectedCollection: ICycle[] = [...additionalCycles, ...cycleCollection];
      jest.spyOn(cycleService, 'addCycleToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ filiere });
      comp.ngOnInit();

      expect(cycleService.query).toHaveBeenCalled();
      expect(cycleService.addCycleToCollectionIfMissing).toHaveBeenCalledWith(cycleCollection, ...additionalCycles);
      expect(comp.cyclesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call UE query and add missing value', () => {
      const filiere: IFiliere = { id: 456 };
      const uES: IUE[] = [{ id: 71738 }];
      filiere.uES = uES;

      const uECollection: IUE[] = [{ id: 86420 }];
      jest.spyOn(uEService, 'query').mockReturnValue(of(new HttpResponse({ body: uECollection })));
      const additionalUES = [...uES];
      const expectedCollection: IUE[] = [...additionalUES, ...uECollection];
      jest.spyOn(uEService, 'addUEToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ filiere });
      comp.ngOnInit();

      expect(uEService.query).toHaveBeenCalled();
      expect(uEService.addUEToCollectionIfMissing).toHaveBeenCalledWith(uECollection, ...additionalUES);
      expect(comp.uESSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const filiere: IFiliere = { id: 456 };
      const etudiant: ICycle = { id: 2641 };
      filiere.etudiant = etudiant;
      const uES: IUE = { id: 6670 };
      filiere.uES = [uES];

      activatedRoute.data = of({ filiere });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(filiere));
      expect(comp.cyclesSharedCollection).toContain(etudiant);
      expect(comp.uESSharedCollection).toContain(uES);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Filiere>>();
      const filiere = { id: 123 };
      jest.spyOn(filiereService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ filiere });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: filiere }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(filiereService.update).toHaveBeenCalledWith(filiere);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Filiere>>();
      const filiere = new Filiere();
      jest.spyOn(filiereService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ filiere });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: filiere }));
      saveSubject.complete();

      // THEN
      expect(filiereService.create).toHaveBeenCalledWith(filiere);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Filiere>>();
      const filiere = { id: 123 };
      jest.spyOn(filiereService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ filiere });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(filiereService.update).toHaveBeenCalledWith(filiere);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackCycleById', () => {
      it('Should return tracked Cycle primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackCycleById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackUEById', () => {
      it('Should return tracked UE primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackUEById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });

  describe('Getting selected relationships', () => {
    describe('getSelectedUE', () => {
      it('Should return option if no UE is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedUE(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected UE for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedUE(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this UE is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedUE(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });
  });
});
