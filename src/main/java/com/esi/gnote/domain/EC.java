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
 * A EC.
 */
@Entity
@Table(name = "ec")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class EC implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "nom_ec", nullable = false)
    private String nomEC;

    @NotNull
    @Column(name = "coeff", nullable = false)
    private Integer coeff;

    @ManyToMany(mappedBy = "eCS")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "etudiants", "classes", "eCS", "inspecteurs" }, allowSetters = true)
    private Set<Professeur> professeurs = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public EC id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomEC() {
        return this.nomEC;
    }

    public EC nomEC(String nomEC) {
        this.setNomEC(nomEC);
        return this;
    }

    public void setNomEC(String nomEC) {
        this.nomEC = nomEC;
    }

    public Integer getCoeff() {
        return this.coeff;
    }

    public EC coeff(Integer coeff) {
        this.setCoeff(coeff);
        return this;
    }

    public void setCoeff(Integer coeff) {
        this.coeff = coeff;
    }

    public Set<Professeur> getProfesseurs() {
        return this.professeurs;
    }

    public void setProfesseurs(Set<Professeur> professeurs) {
        if (this.professeurs != null) {
            this.professeurs.forEach(i -> i.removeEC(this));
        }
        if (professeurs != null) {
            professeurs.forEach(i -> i.addEC(this));
        }
        this.professeurs = professeurs;
    }

    public EC professeurs(Set<Professeur> professeurs) {
        this.setProfesseurs(professeurs);
        return this;
    }

    public EC addProfesseur(Professeur professeur) {
        this.professeurs.add(professeur);
        professeur.getECS().add(this);
        return this;
    }

    public EC removeProfesseur(Professeur professeur) {
        this.professeurs.remove(professeur);
        professeur.getECS().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EC)) {
            return false;
        }
        return id != null && id.equals(((EC) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EC{" +
            "id=" + getId() +
            ", nomEC='" + getNomEC() + "'" +
            ", coeff=" + getCoeff() +
            "}";
    }
}
