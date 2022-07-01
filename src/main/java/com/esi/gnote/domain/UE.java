package com.esi.gnote.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
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

    @ManyToMany(mappedBy = "uES")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "etudiant", "uES", "classes" }, allowSetters = true)
    private Set<Filiere> filieres = new HashSet<>();

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

    public Set<Filiere> getFilieres() {
        return this.filieres;
    }

    public void setFilieres(Set<Filiere> filieres) {
        if (this.filieres != null) {
            this.filieres.forEach(i -> i.removeUE(this));
        }
        if (filieres != null) {
            filieres.forEach(i -> i.addUE(this));
        }
        this.filieres = filieres;
    }

    public UE filieres(Set<Filiere> filieres) {
        this.setFilieres(filieres);
        return this;
    }

    public UE addFiliere(Filiere filiere) {
        this.filieres.add(filiere);
        filiere.getUES().add(this);
        return this;
    }

    public UE removeFiliere(Filiere filiere) {
        this.filieres.remove(filiere);
        filiere.getUES().remove(this);
        return this;
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
