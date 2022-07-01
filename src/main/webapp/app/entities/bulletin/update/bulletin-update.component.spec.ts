import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { BulletinService } from '../service/bulletin.service';
import { IBulletin, Bulletin } from '../bulletin.model';

import { BulletinUpdateComponent } from './bulletin-update.component';

describe('Bulletin Management Update Component', () => {
  let comp: BulletinUpdateComponent;
  let fixture: ComponentFixture<BulletinUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let bulletinService: BulletinService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [BulletinUpdateComponent],
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
      .overrideTemplate(BulletinUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(BulletinUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    bulletinService = TestBed.inject(BulletinService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const bulletin: IBulletin = { id: 456 };

      activatedRoute.data = of({ bulletin });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(bulletin));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Bulletin>>();
      const bulletin = { id: 123 };
      jest.spyOn(bulletinService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ bulletin });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: bulletin }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(bulletinService.update).toHaveBeenCalledWith(bulletin);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Bulletin>>();
      const bulletin = new Bulletin();
      jest.spyOn(bulletinService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ bulletin });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: bulletin }));
      saveSubject.complete();

      // THEN
      expect(bulletinService.create).toHaveBeenCalledWith(bulletin);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Bulletin>>();
      const bulletin = { id: 123 };
      jest.spyOn(bulletinService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ bulletin });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(bulletinService.update).toHaveBeenCalledWith(bulletin);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
