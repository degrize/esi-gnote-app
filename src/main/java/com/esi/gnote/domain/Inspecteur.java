package com.esi.gnote.domain;

import java.io.Serializable;
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
