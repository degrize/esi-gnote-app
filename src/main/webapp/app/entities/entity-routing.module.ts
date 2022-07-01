import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'annee-scolaire',
        data: { pageTitle: 'gnoteApplicationApp.anneeScolaire.home.title' },
        loadChildren: () => import('./annee-scolaire/annee-scolaire.module').then(m => m.AnneeScolaireModule),
      },
      {
        path: 'planche',
        data: { pageTitle: 'gnoteApplicationApp.planche.home.title' },
        loadChildren: () => import('./planche/planche.module').then(m => m.PlancheModule),
      },
      {
        path: 'semestre',
        data: { pageTitle: 'gnoteApplicationApp.semestre.home.title' },
        loadChildren: () => import('./semestre/semestre.module').then(m => m.SemestreModule),
      },
      {
        path: 'note',
        data: { pageTitle: 'gnoteApplicationApp.note.home.title' },
        loadChildren: () => import('./note/note.module').then(m => m.NoteModule),
      },
      {
        path: 'bulletin',
        data: { pageTitle: 'gnoteApplicationApp.bulletin.home.title' },
        loadChildren: () => import('./bulletin/bulletin.module').then(m => m.BulletinModule),
      },
      {
        path: 'professeur',
        data: { pageTitle: 'gnoteApplicationApp.professeur.home.title' },
        loadChildren: () => import('./professeur/professeur.module').then(m => m.ProfesseurModule),
      },
      {
        path: 'filiere',
        data: { pageTitle: 'gnoteApplicationApp.filiere.home.title' },
        loadChildren: () => import('./filiere/filiere.module').then(m => m.FiliereModule),
      },
      {
        path: 'classe',
        data: { pageTitle: 'gnoteApplicationApp.classe.home.title' },
        loadChildren: () => import('./classe/classe.module').then(m => m.ClasseModule),
      },
      {
        path: 'etudiant',
        data: { pageTitle: 'gnoteApplicationApp.etudiant.home.title' },
        loadChildren: () => import('./etudiant/etudiant.module').then(m => m.EtudiantModule),
      },
      {
        path: 'absence',
        data: { pageTitle: 'gnoteApplicationApp.absence.home.title' },
        loadChildren: () => import('./absence/absence.module').then(m => m.AbsenceModule),
      },
      {
        path: 'inspecteur',
        data: { pageTitle: 'gnoteApplicationApp.inspecteur.home.title' },
        loadChildren: () => import('./inspecteur/inspecteur.module').then(m => m.InspecteurModule),
      },
      {
        path: 'ec',
        data: { pageTitle: 'gnoteApplicationApp.eC.home.title' },
        loadChildren: () => import('./ec/ec.module').then(m => m.ECModule),
      },
      {
        path: 'ue',
        data: { pageTitle: 'gnoteApplicationApp.uE.home.title' },
        loadChildren: () => import('./ue/ue.module').then(m => m.UEModule),
      },
      {
        path: 'encadreur',
        data: { pageTitle: 'gnoteApplicationApp.encadreur.home.title' },
        loadChildren: () => import('./encadreur/encadreur.module').then(m => m.EncadreurModule),
      },
      {
        path: 'horaire',
        data: { pageTitle: 'gnoteApplicationApp.horaire.home.title' },
        loadChildren: () => import('./horaire/horaire.module').then(m => m.HoraireModule),
      },
      {
        path: 'soutenance',
        data: { pageTitle: 'gnoteApplicationApp.soutenance.home.title' },
        loadChildren: () => import('./soutenance/soutenance.module').then(m => m.SoutenanceModule),
      },
      {
        path: 'salle',
        data: { pageTitle: 'gnoteApplicationApp.salle.home.title' },
        loadChildren: () => import('./salle/salle.module').then(m => m.SalleModule),
      },
      {
        path: 'jury',
        data: { pageTitle: 'gnoteApplicationApp.jury.home.title' },
        loadChildren: () => import('./jury/jury.module').then(m => m.JuryModule),
      },
      {
        path: 'cycle',
        data: { pageTitle: 'gnoteApplicationApp.cycle.home.title' },
        loadChildren: () => import('./cycle/cycle.module').then(m => m.CycleModule),
      },
      {
        path: 'demande-inspecteur-etudiant',
        data: { pageTitle: 'gnoteApplicationApp.demandeInspecteurEtudiant.home.title' },
        loadChildren: () =>
          import('./demande-inspecteur-etudiant/demande-inspecteur-etudiant.module').then(m => m.DemandeInspecteurEtudiantModule),
      },
      {
        path: 'demande-inspecteur-de',
        data: { pageTitle: 'gnoteApplicationApp.demandeInspecteurDE.home.title' },
        loadChildren: () => import('./demande-inspecteur-de/demande-inspecteur-de.module').then(m => m.DemandeInspecteurDEModule),
      },
      {
        path: 'recuperer-bulletin',
        data: { pageTitle: 'gnoteApplicationApp.recupererBulletin.home.title' },
        loadChildren: () => import('./recuperer-bulletin/recuperer-bulletin.module').then(m => m.RecupererBulletinModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
