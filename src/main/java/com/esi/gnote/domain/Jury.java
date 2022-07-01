package com.esi.gnote.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * The Jury entity.
 */
@Entity
@Table(name = "jury")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Jury implements Serializable {

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
    @Column(name = "president_jury", nullable = false)
    private String presidentJury;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Jury id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPresidentJury() {
        return this.presidentJury;
    }

    public Jury presidentJury(String presidentJury) {
        this.setPresidentJury(presidentJury);
        return this;
    }

    public void setPresidentJury(String presidentJury) {
        this.presidentJury = presidentJury;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Jury)) {
            return false;
        }
        return id != null && id.equals(((Jury) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Jury{" +
            "id=" + getId() +
            ", presidentJury='" + getPresidentJury() + "'" +
            "}";
    }
}
