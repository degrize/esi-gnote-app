package com.esi.gnote.domain;

import com.esi.gnote.domain.enumeration.TypeSoutenance;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Soutenance.
 */
@Entity
@Table(name = "soutenance")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Soutenance implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "type_sout", nullable = false)
    private TypeSoutenance typeSout;

    @NotNull
    @Column(name = "theme_sout", nullable = false)
    private String themeSout;

    @NotNull
    @Column(name = "note_sout", nullable = false)
    private Double noteSout;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Soutenance id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TypeSoutenance getTypeSout() {
        return this.typeSout;
    }

    public Soutenance typeSout(TypeSoutenance typeSout) {
        this.setTypeSout(typeSout);
        return this;
    }

    public void setTypeSout(TypeSoutenance typeSout) {
        this.typeSout = typeSout;
    }

    public String getThemeSout() {
        return this.themeSout;
    }

    public Soutenance themeSout(String themeSout) {
        this.setThemeSout(themeSout);
        return this;
    }

    public void setThemeSout(String themeSout) {
        this.themeSout = themeSout;
    }

    public Double getNoteSout() {
        return this.noteSout;
    }

    public Soutenance noteSout(Double noteSout) {
        this.setNoteSout(noteSout);
        return this;
    }

    public void setNoteSout(Double noteSout) {
        this.noteSout = noteSout;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Soutenance)) {
            return false;
        }
        return id != null && id.equals(((Soutenance) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Soutenance{" +
            "id=" + getId() +
            ", typeSout='" + getTypeSout() + "'" +
            ", themeSout='" + getThemeSout() + "'" +
            ", noteSout=" + getNoteSout() +
            "}";
    }
}
