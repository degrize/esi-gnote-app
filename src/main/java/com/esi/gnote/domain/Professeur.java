package com.esi.gnote.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Professeur.
 */
@Entity
@Table(name = "professeur")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Professeur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "nom_prof", nullable = false)
    private String nomProf;

    @NotNull
    @Column(name = "prenom_prof", nullable = false)
    private String prenomProf;

    @Column(name = "contact_prof")
    private String contactProf;

    @ManyToMany
    @JoinTable(
        name = "rel_professeur__etudiant",
        joinColumns = @JoinColumn(name = "professeur_id"),
        inverseJoinColumns = @JoinColumn(name = "etudiant_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "inspecteurs", "professeurs" }, allowSetters = true)
    private Set<Etudiant> etudiants = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "rel_professeur__classe",
        joinColumns = @JoinColumn(name = "professeur_id"),
        inverseJoinColumns = @JoinColumn(name = "classe_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "filiere", "professeurs" }, allowSetters = true)
    private Set<Classe> classes = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "rel_professeur__ec",
        joinColumns = @JoinColumn(name = "professeur_id"),
        inverseJoinColumns = @JoinColumn(name = "ec_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "professeurs" }, allowSetters = true)
    private Set<EC> eCS = new HashSet<>();

    @ManyToMany(mappedBy = "professeurs")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "professeurs", "etudiants" }, allowSetters = true)
    private Set<Inspecteur> inspecteurs = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Professeur id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomProf() {
        return this.nomProf;
    }

    public Professeur nomProf(String nomProf) {
        this.setNomProf(nomProf);
        return this;
    }

    public void setNomProf(String nomProf) {
        this.nomProf = nomProf;
    }

    public String getPrenomProf() {
        return this.prenomProf;
    }

    public Professeur prenomProf(String prenomProf) {
        this.setPrenomProf(prenomProf);
        return this;
    }

    public void setPrenomProf(String prenomProf) {
        this.prenomProf = prenomProf;
    }

    public String getContactProf() {
        return this.contactProf;
    }

    public Professeur contactProf(String contactProf) {
        this.setContactProf(contactProf);
        return this;
    }

    public void setContactProf(String contactProf) {
        this.contactProf = contactProf;
    }

    public Set<Etudiant> getEtudiants() {
        return this.etudiants;
    }

    public void setEtudiants(Set<Etudiant> etudiants) {
        this.etudiants = etudiants;
    }

    public Professeur etudiants(Set<Etudiant> etudiants) {
        this.setEtudiants(etudiants);
        return this;
    }

    public Professeur addEtudiant(Etudiant etudiant) {
        this.etudiants.add(etudiant);
        etudiant.getProfesseurs().add(this);
        return this;
    }

    public Professeur removeEtudiant(Etudiant etudiant) {
        this.etudiants.remove(etudiant);
        etudiant.getProfesseurs().remove(this);
        return this;
    }

    public Set<Classe> getClasses() {
        return this.classes;
    }

    public void setClasses(Set<Classe> classes) {
        this.classes = classes;
    }

    public Professeur classes(Set<Classe> classes) {
        this.setClasses(classes);
        return this;
    }

    public Professeur addClasse(Classe classe) {
        this.classes.add(classe);
        classe.getProfesseurs().add(this);
        return this;
    }

    public Professeur removeClasse(Classe classe) {
        this.classes.remove(classe);
        classe.getProfesseurs().remove(this);
        return this;
    }

    public Set<EC> getECS() {
        return this.eCS;
    }

    public void setECS(Set<EC> eCS) {
        this.eCS = eCS;
    }

    public Professeur eCS(Set<EC> eCS) {
        this.setECS(eCS);
        return this;
    }

    public Professeur addEC(EC eC) {
        this.eCS.add(eC);
        eC.getProfesseurs().add(this);
        return this;
    }

    public Professeur removeEC(EC eC) {
        this.eCS.remove(eC);
        eC.getProfesseurs().remove(this);
        return this;
    }

    public Set<Inspecteur> getInspecteurs() {
        return this.inspecteurs;
    }

    public void setInspecteurs(Set<Inspecteur> inspecteurs) {
        if (this.inspecteurs != null) {
            this.inspecteurs.forEach(i -> i.removeProfesseur(this));
        }
        if (inspecteurs != null) {
            inspecteurs.forEach(i -> i.addProfesseur(this));
        }
        this.inspecteurs = inspecteurs;
    }

    public Professeur inspecteurs(Set<Inspecteur> inspecteurs) {
        this.setInspecteurs(inspecteurs);
        return this;
    }

    public Professeur addInspecteur(Inspecteur inspecteur) {
        this.inspecteurs.add(inspecteur);
        inspecteur.getProfesseurs().add(this);
        return this;
    }

    public Professeur removeInspecteur(Inspecteur inspecteur) {
        this.inspecteurs.remove(inspecteur);
        inspecteur.getProfesseurs().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Professeur)) {
            return false;
        }
        return id != null && id.equals(((Professeur) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Professeur{" +
            "id=" + getId() +
            ", nomProf='" + getNomProf() + "'" +
            ", prenomProf='" + getPrenomProf() + "'" +
            ", contactProf='" + getContactProf() + "'" +
            "}";
    }
}
