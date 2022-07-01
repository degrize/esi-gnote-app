package com.esi.gnote.domain;

import java.io.Serializable;
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
