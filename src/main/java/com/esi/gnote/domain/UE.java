package com.esi.gnote.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A UE.
 */
@Entity
@Table(name = "ue")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class UE implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "nom_ue")
    private String nomUE;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public UE id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomUE() {
        return this.nomUE;
    }

    public UE nomUE(String nomUE) {
        this.setNomUE(nomUE);
        return this;
    }

    public void setNomUE(String nomUE) {
        this.nomUE = nomUE;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UE)) {
            return false;
        }
        return id != null && id.equals(((UE) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UE{" +
            "id=" + getId() +
            ", nomUE='" + getNomUE() + "'" +
            "}";
    }
}
