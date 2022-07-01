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
 * The Employee entity.
 */
@Entity
@Table(name = "inspecteur")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Inspecteur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    /**
     * The firstname attribute.
     */
    @NotNull
    @Column(name = "nom_inspecteur", nullable = false)
    private String nomInspecteur;

    @Column(name = "prenom_inspecteur")
    private String prenomInspecteur;

    @Column(name = "contact_inspecteur")
    private String contactInspecteur;

    @ManyToMany
    @JoinTable(
        name = "rel_inspecteur__professeur",
        joinColumns = @JoinColumn(name = "inspecteur_id"),
        inverseJoinColumns = @JoinColumn(name = "professeur_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "etudiants", "classes", "eCS", "inspecteurs", "bulletins", "juries" }, allowSetters = true)
    private Set<Professeur> professeurs = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "rel_inspecteur__etudiant",
        joinColumns = @JoinColumn(name = "inspecteur_id"),
        inverseJoinColumns = @JoinColumn(name = "etudiant_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "encadreur", "inspecteurs", "professeurs", "soutenances" }, allowSetters = true)
    private Set<Etudiant> etudiants = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Inspecteur id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomInspecteur() {
        return this.nomInspecteur;
    }

    public Inspecteur nomInspecteur(String nomInspecteur) {
        this.setNomInspecteur(nomInspecteur);
        return this;
    }

    public void setNomInspecteur(String nomInspecteur) {
        this.nomInspecteur = nomInspecteur;
    }

    public String getPrenomInspecteur() {
        return this.prenomInspecteur;
    }

    public Inspecteur prenomInspecteur(String prenomInspecteur) {
        this.setPrenomInspecteur(prenomInspecteur);
        return this;
    }

    public void setPrenomInspecteur(String prenomInspecteur) {
        this.prenomInspecteur = prenomInspecteur;
    }

    public String getContactInspecteur() {
        return this.contactInspecteur;
    }

    public Inspecteur contactInspecteur(String contactInspecteur) {
        this.setContactInspecteur(contactInspecteur);
        return this;
    }

    public void setContactInspecteur(String contactInspecteur) {
        this.contactInspecteur = contactInspecteur;
    }

    public Set<Professeur> getProfesseurs() {
        return this.professeurs;
    }

    public void setProfesseurs(Set<Professeur> professeurs) {
        this.professeurs = professeurs;
    }

    public Inspecteur professeurs(Set<Professeur> professeurs) {
        this.setProfesseurs(professeurs);
        return this;
    }

    public Inspecteur addProfesseur(Professeur professeur) {
        this.professeurs.add(professeur);
        professeur.getInspecteurs().add(this);
        return this;
    }

    public Inspecteur removeProfesseur(Professeur professeur) {
        this.professeurs.remove(professeur);
        professeur.getInspecteurs().remove(this);
        return this;
    }

    public Set<Etudiant> getEtudiants() {
        return this.etudiants;
    }

    public void setEtudiants(Set<Etudiant> etudiants) {
        this.etudiants = etudiants;
    }

    public Inspecteur etudiants(Set<Etudiant> etudiants) {
        this.setEtudiants(etudiants);
        return this;
    }

    public Inspecteur addEtudiant(Etudiant etudiant) {
        this.etudiants.add(etudiant);
        etudiant.getInspecteurs().add(this);
        return this;
    }

    public Inspecteur removeEtudiant(Etudiant etudiant) {
        this.etudiants.remove(etudiant);
        etudiant.getInspecteurs().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Inspecteur)) {
            return false;
        }
        return id != null && id.equals(((Inspecteur) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Inspecteur{" +
            "id=" + getId() +
            ", nomInspecteur='" + getNomInspecteur() + "'" +
            ", prenomInspecteur='" + getPrenomInspecteur() + "'" +
            ", contactInspecteur='" + getContactInspecteur() + "'" +
            "}";
    }
}
