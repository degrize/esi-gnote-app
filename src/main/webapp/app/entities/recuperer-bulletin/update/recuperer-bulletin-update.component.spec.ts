import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { RecupererBulletinService } from '../service/recuperer-bulletin.service';
import { IRecupererBulletin, RecupererBulletin } from '../recuperer-bulletin.model';

import { RecupererBulletinUpdateComponent } from './recuperer-bulletin-update.component';

describe('RecupererBulletin Management Update Component', () => {
  let comp: RecupererBulletinUpdateComponent;
  let fixture: ComponentFixture<RecupererBulletinUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let recupererBulletinService: RecupererBulletinService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [RecupererBulletinUpdateComponent],
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
      .overrideTemplate(RecupererBulletinUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RecupererBulletinUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    recupererBulletinService = TestBed.inject(RecupererBulletinService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const recupererBulletin: IRecupererBulletin = { id: 456 };

      activatedRoute.data = of({ recupererBulletin });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(recupererBulletin));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RecupererBulletin>>();
      const recupererBulletin = { id: 123 };
      jest.spyOn(recupererBulletinService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ recupererBulletin });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: recupererBulletin }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(recupererBulletinService.update).toHaveBeenCalledWith(recupererBulletin);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RecupererBulletin>>();
      const recupererBulletin = new RecupererBulletin();
      jest.spyOn(recupererBulletinService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ recupererBulletin });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: recupererBulletin }));
      saveSubject.complete();

      // THEN
      expect(recupererBulletinService.create).toHaveBeenCalledWith(recupererBulletin);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RecupererBulletin>>();
      const recupererBulletin = { id: 123 };
      jest.spyOn(recupererBulletinService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ recupererBulletin });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(recupererBulletinService.update).toHaveBeenCalledWith(recupererBulletin);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
