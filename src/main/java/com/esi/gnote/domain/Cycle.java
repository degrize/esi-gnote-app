package com.esi.gnote.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Cycle.
 */
@Entity
@Table(name = "cycle")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Cycle implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "nom_cycle", nullable = false)
    private String nomCycle;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Cycle id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomCycle() {
        return this.nomCycle;
    }

    public Cycle nomCycle(String nomCycle) {
        this.setNomCycle(nomCycle);
        return this;
    }

    public void setNomCycle(String nomCycle) {
        this.nomCycle = nomCycle;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Cycle)) {
            return false;
        }
        return id != null && id.equals(((Cycle) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Cycle{" +
            "id=" + getId() +
            ", nomCycle='" + getNomCycle() + "'" +
            "}";
    }
}
