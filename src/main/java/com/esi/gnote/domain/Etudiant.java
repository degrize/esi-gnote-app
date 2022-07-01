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
 * A Etudiant.
 */
@Entity
@Table(name = "etudiant")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Etudiant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "matricule_et", nullable = false)
    private String matriculeET;

    @NotNull
    @Column(name = "nom_et", nullable = false)
    private String nomET;

    @NotNull
    @Column(name = "prenom_et", nullable = false)
    private String prenomET;

    @Lob
    @Column(name = "photo")
    private byte[] photo;

    @Column(name = "photo_content_type")
    private String photoContentType;

    @Column(name = "numero_parent")
    private String numeroParent;

    @Column(name = "numero_tuteur")
    private String numeroTuteur;

    @Column(name = "contact_et")
    private String contactET;

    @ManyToMany(mappedBy = "etudiants")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "professeurs", "etudiants" }, allowSetters = true)
    private Set<Inspecteur> inspecteurs = new HashSet<>();

    @ManyToMany(mappedBy = "etudiants")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "etudiants", "classes", "eCS", "inspecteurs" }, allowSetters = true)
    private Set<Professeur> professeurs = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Etudiant id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMatriculeET() {
        return this.matriculeET;
    }

    public Etudiant matriculeET(String matriculeET) {
        this.setMatriculeET(matriculeET);
        return this;
    }

    public void setMatriculeET(String matriculeET) {
        this.matriculeET = matriculeET;
    }

    public String getNomET() {
        return this.nomET;
    }

    public Etudiant nomET(String nomET) {
        this.setNomET(nomET);
        return this;
    }

    public void setNomET(String nomET) {
        this.nomET = nomET;
    }

    public String getPrenomET() {
        return this.prenomET;
    }

    public Etudiant prenomET(String prenomET) {
        this.setPrenomET(prenomET);
        return this;
    }

    public void setPrenomET(String prenomET) {
        this.prenomET = prenomET;
    }

    public byte[] getPhoto() {
        return this.photo;
    }

    public Etudiant photo(byte[] photo) {
        this.setPhoto(photo);
        return this;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public String getPhotoContentType() {
        return this.photoContentType;
    }

    public Etudiant photoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
        return this;
    }

    public void setPhotoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
    }

    public String getNumeroParent() {
        return this.numeroParent;
    }

    public Etudiant numeroParent(String numeroParent) {
        this.setNumeroParent(numeroParent);
        return this;
    }

    public void setNumeroParent(String numeroParent) {
        this.numeroParent = numeroParent;
    }

    public String getNumeroTuteur() {
        return this.numeroTuteur;
    }

    public Etudiant numeroTuteur(String numeroTuteur) {
        this.setNumeroTuteur(numeroTuteur);
        return this;
    }

    public void setNumeroTuteur(String numeroTuteur) {
        this.numeroTuteur = numeroTuteur;
    }

    public String getContactET() {
        return this.contactET;
    }

    public Etudiant contactET(String contactET) {
        this.setContactET(contactET);
        return this;
    }

    public void setContactET(String contactET) {
        this.contactET = contactET;
    }

    public Set<Inspecteur> getInspecteurs() {
        return this.inspecteurs;
    }

    public void setInspecteurs(Set<Inspecteur> inspecteurs) {
        if (this.inspecteurs != null) {
            this.inspecteurs.forEach(i -> i.removeEtudiant(this));
        }
        if (inspecteurs != null) {
            inspecteurs.forEach(i -> i.addEtudiant(this));
        }
        this.inspecteurs = inspecteurs;
    }

    public Etudiant inspecteurs(Set<Inspecteur> inspecteurs) {
        this.setInspecteurs(inspecteurs);
        return this;
    }

    public Etudiant addInspecteur(Inspecteur inspecteur) {
        this.inspecteurs.add(inspecteur);
        inspecteur.getEtudiants().add(this);
        return this;
    }

    public Etudiant removeInspecteur(Inspecteur inspecteur) {
        this.inspecteurs.remove(inspecteur);
        inspecteur.getEtudiants().remove(this);
        return this;
    }

    public Set<Professeur> getProfesseurs() {
        return this.professeurs;
    }

    public void setProfesseurs(Set<Professeur> professeurs) {
        if (this.professeurs != null) {
            this.professeurs.forEach(i -> i.removeEtudiant(this));
        }
        if (professeurs != null) {
            professeurs.forEach(i -> i.addEtudiant(this));
        }
        this.professeurs = professeurs;
    }

    public Etudiant professeurs(Set<Professeur> professeurs) {
        this.setProfesseurs(professeurs);
        return this;
    }

    public Etudiant addProfesseur(Professeur professeur) {
        this.professeurs.add(professeur);
        professeur.getEtudiants().add(this);
        return this;
    }

    public Etudiant removeProfesseur(Professeur professeur) {
        this.professeurs.remove(professeur);
        professeur.getEtudiants().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Etudiant)) {
            return false;
        }
        return id != null && id.equals(((Etudiant) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Etudiant{" +
            "id=" + getId() +
            ", matriculeET='" + getMatriculeET() + "'" +
            ", nomET='" + getNomET() + "'" +
            ", prenomET='" + getPrenomET() + "'" +
            ", photo='" + getPhoto() + "'" +
            ", photoContentType='" + getPhotoContentType() + "'" +
            ", numeroParent='" + getNumeroParent() + "'" +
            ", numeroTuteur='" + getNumeroTuteur() + "'" +
            ", contactET='" + getContactET() + "'" +
            "}";
    }
}
