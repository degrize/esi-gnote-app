import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ClasseService } from '../service/classe.service';
import { IClasse, Classe } from '../classe.model';
import { IFiliere } from 'app/entities/filiere/filiere.model';
import { FiliereService } from 'app/entities/filiere/service/filiere.service';
import { IEC } from 'app/entities/ec/ec.model';
import { ECService } from 'app/entities/ec/service/ec.service';

import { ClasseUpdateComponent } from './classe-update.component';

describe('Classe Management Update Component', () => {
  let comp: ClasseUpdateComponent;
  let fixture: ComponentFixture<ClasseUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let classeService: ClasseService;
  let filiereService: FiliereService;
  let eCService: ECService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ClasseUpdateComponent],
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
      .overrideTemplate(ClasseUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ClasseUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    classeService = TestBed.inject(ClasseService);
    filiereService = TestBed.inject(FiliereService);
    eCService = TestBed.inject(ECService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Filiere query and add missing value', () => {
      const classe: IClasse = { id: 456 };
      const filiere: IFiliere = { id: 56677 };
      classe.filiere = filiere;

      const filiereCollection: IFiliere[] = [{ id: 70749 }];
      jest.spyOn(filiereService, 'query').mockReturnValue(of(new HttpResponse({ body: filiereCollection })));
      const additionalFilieres = [filiere];
      const expectedCollection: IFiliere[] = [...additionalFilieres, ...filiereCollection];
      jest.spyOn(filiereService, 'addFiliereToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ classe });
      comp.ngOnInit();

      expect(filiereService.query).toHaveBeenCalled();
      expect(filiereService.addFiliereToCollectionIfMissing).toHaveBeenCalledWith(filiereCollection, ...additionalFilieres);
      expect(comp.filieresSharedCollection).toEqual(expectedCollection);
    });

    it('Should call EC query and add missing value', () => {
      const classe: IClasse = { id: 456 };
      const eCS: IEC[] = [{ id: 86173 }];
      classe.eCS = eCS;

      const eCCollection: IEC[] = [{ id: 79387 }];
      jest.spyOn(eCService, 'query').mockReturnValue(of(new HttpResponse({ body: eCCollection })));
      const additionalECS = [...eCS];
      const expectedCollection: IEC[] = [...additionalECS, ...eCCollection];
      jest.spyOn(eCService, 'addECToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ classe });
      comp.ngOnInit();

      expect(eCService.query).toHaveBeenCalled();
      expect(eCService.addECToCollectionIfMissing).toHaveBeenCalledWith(eCCollection, ...additionalECS);
      expect(comp.eCSSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const classe: IClasse = { id: 456 };
      const filiere: IFiliere = { id: 12065 };
      classe.filiere = filiere;
      const eCS: IEC = { id: 46304 };
      classe.eCS = [eCS];

      activatedRoute.data = of({ classe });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(classe));
      expect(comp.filieresSharedCollection).toContain(filiere);
      expect(comp.eCSSharedCollection).toContain(eCS);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Classe>>();
      const classe = { id: 123 };
      jest.spyOn(classeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ classe });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: classe }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(classeService.update).toHaveBeenCalledWith(classe);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Classe>>();
      const classe = new Classe();
      jest.spyOn(classeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ classe });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: classe }));
      saveSubject.complete();

      // THEN
      expect(classeService.create).toHaveBeenCalledWith(classe);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Classe>>();
      const classe = { id: 123 };
      jest.spyOn(classeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ classe });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(classeService.update).toHaveBeenCalledWith(classe);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackFiliereById', () => {
      it('Should return tracked Filiere primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackFiliereById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackECById', () => {
      it('Should return tracked EC primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackECById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });

  describe('Getting selected relationships', () => {
    describe('getSelectedEC', () => {
      it('Should return option if no EC is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedEC(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected EC for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedEC(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this EC is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedEC(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });
  });
});
