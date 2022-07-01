import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { InspecteurService } from '../service/inspecteur.service';
import { IInspecteur, Inspecteur } from '../inspecteur.model';

import { InspecteurUpdateComponent } from './inspecteur-update.component';

describe('Inspecteur Management Update Component', () => {
  let comp: InspecteurUpdateComponent;
  let fixture: ComponentFixture<InspecteurUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let inspecteurService: InspecteurService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [InspecteurUpdateComponent],
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
      .overrideTemplate(InspecteurUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(InspecteurUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    inspecteurService = TestBed.inject(InspecteurService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const inspecteur: IInspecteur = { id: 456 };

      activatedRoute.data = of({ inspecteur });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(inspecteur));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Inspecteur>>();
      const inspecteur = { id: 123 };
      jest.spyOn(inspecteurService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ inspecteur });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: inspecteur }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(inspecteurService.update).toHaveBeenCalledWith(inspecteur);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Inspecteur>>();
      const inspecteur = new Inspecteur();
      jest.spyOn(inspecteurService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ inspecteur });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: inspecteur }));
      saveSubject.complete();

      // THEN
      expect(inspecteurService.create).toHaveBeenCalledWith(inspecteur);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Inspecteur>>();
      const inspecteur = { id: 123 };
      jest.spyOn(inspecteurService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ inspecteur });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(inspecteurService.update).toHaveBeenCalledWith(inspecteur);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
