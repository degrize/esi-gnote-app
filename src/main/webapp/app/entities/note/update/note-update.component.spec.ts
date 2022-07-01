import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { NoteService } from '../service/note.service';
import { INote, Note } from '../note.model';
import { IEtudiant } from 'app/entities/etudiant/etudiant.model';
import { EtudiantService } from 'app/entities/etudiant/service/etudiant.service';
import { IEC } from 'app/entities/ec/ec.model';
import { ECService } from 'app/entities/ec/service/ec.service';

import { NoteUpdateComponent } from './note-update.component';

describe('Note Management Update Component', () => {
  let comp: NoteUpdateComponent;
  let fixture: ComponentFixture<NoteUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let noteService: NoteService;
  let etudiantService: EtudiantService;
  let eCService: ECService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [NoteUpdateComponent],
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
      .overrideTemplate(NoteUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(NoteUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    noteService = TestBed.inject(NoteService);
    etudiantService = TestBed.inject(EtudiantService);
    eCService = TestBed.inject(ECService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Etudiant query and add missing value', () => {
      const note: INote = { id: 456 };
      const etudiants: IEtudiant[] = [{ id: 1985 }];
      note.etudiants = etudiants;

      const etudiantCollection: IEtudiant[] = [{ id: 16026 }];
      jest.spyOn(etudiantService, 'query').mockReturnValue(of(new HttpResponse({ body: etudiantCollection })));
      const additionalEtudiants = [...etudiants];
      const expectedCollection: IEtudiant[] = [...additionalEtudiants, ...etudiantCollection];
      jest.spyOn(etudiantService, 'addEtudiantToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ note });
      comp.ngOnInit();

      expect(etudiantService.query).toHaveBeenCalled();
      expect(etudiantService.addEtudiantToCollectionIfMissing).toHaveBeenCalledWith(etudiantCollection, ...additionalEtudiants);
      expect(comp.etudiantsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call EC query and add missing value', () => {
      const note: INote = { id: 456 };
      const eCS: IEC[] = [{ id: 72211 }];
      note.eCS = eCS;

      const eCCollection: IEC[] = [{ id: 81709 }];
      jest.spyOn(eCService, 'query').mockReturnValue(of(new HttpResponse({ body: eCCollection })));
      const additionalECS = [...eCS];
      const expectedCollection: IEC[] = [...additionalECS, ...eCCollection];
      jest.spyOn(eCService, 'addECToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ note });
      comp.ngOnInit();

      expect(eCService.query).toHaveBeenCalled();
      expect(eCService.addECToCollectionIfMissing).toHaveBeenCalledWith(eCCollection, ...additionalECS);
      expect(comp.eCSSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const note: INote = { id: 456 };
      const etudiants: IEtudiant = { id: 31239 };
      note.etudiants = [etudiants];
      const eCS: IEC = { id: 17285 };
      note.eCS = [eCS];

      activatedRoute.data = of({ note });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(note));
      expect(comp.etudiantsSharedCollection).toContain(etudiants);
      expect(comp.eCSSharedCollection).toContain(eCS);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Note>>();
      const note = { id: 123 };
      jest.spyOn(noteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ note });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: note }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(noteService.update).toHaveBeenCalledWith(note);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Note>>();
      const note = new Note();
      jest.spyOn(noteService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ note });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: note }));
      saveSubject.complete();

      // THEN
      expect(noteService.create).toHaveBeenCalledWith(note);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Note>>();
      const note = { id: 123 };
      jest.spyOn(noteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ note });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(noteService.update).toHaveBeenCalledWith(note);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackEtudiantById', () => {
      it('Should return tracked Etudiant primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackEtudiantById(0, entity);
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
    describe('getSelectedEtudiant', () => {
      it('Should return option if no Etudiant is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedEtudiant(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected Etudiant for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedEtudiant(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this Etudiant is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedEtudiant(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });

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
