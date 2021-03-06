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
 * A Filiere.
 */
@Entity
@Table(name = "filiere")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Filiere implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "nom_filiere", nullable = false)
    private String nomFiliere;

    @ManyToOne
    private Cycle etudiant;

    @ManyToMany
    @JoinTable(name = "rel_filiere__ue", joinColumns = @JoinColumn(name = "filiere_id"), inverseJoinColumns = @JoinColumn(name = "ue_id"))
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "eCS", "filieres" }, allowSetters = true)
    private Set<UE> uES = new HashSet<>();

    @OneToMany(mappedBy = "filiere")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "filiere", "eCS", "professeurs", "etudiants" }, allowSetters = true)
    private Set<Classe> classes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Filiere id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomFiliere() {
        return this.nomFiliere;
    }

    public Filiere nomFiliere(String nomFiliere) {
        this.setNomFiliere(nomFiliere);
        return this;
    }

    public void setNomFiliere(String nomFiliere) {
        this.nomFiliere = nomFiliere;
    }

    public Cycle getEtudiant() {
        return this.etudiant;
    }

    public void setEtudiant(Cycle cycle) {
        this.etudiant = cycle;
    }

    public Filiere etudiant(Cycle cycle) {
        this.setEtudiant(cycle);
        return this;
    }

    public Set<UE> getUES() {
        return this.uES;
    }

    public void setUES(Set<UE> uES) {
        this.uES = uES;
    }

    public Filiere uES(Set<UE> uES) {
        this.setUES(uES);
        return this;
    }

    public Filiere addUE(UE uE) {
        this.uES.add(uE);
        uE.getFilieres().add(this);
        return this;
    }

    public Filiere removeUE(UE uE) {
        this.uES.remove(uE);
        uE.getFilieres().remove(this);
        return this;
    }

    public Set<Classe> getClasses() {
        return this.classes;
    }

    public void setClasses(Set<Classe> classes) {
        if (this.classes != null) {
            this.classes.forEach(i -> i.setFiliere(null));
        }
        if (classes != null) {
            classes.forEach(i -> i.setFiliere(this));
        }
        this.classes = classes;
    }

    public Filiere classes(Set<Classe> classes) {
        this.setClasses(classes);
        return this;
    }

    public Filiere addClasse(Classe classe) {
        this.classes.add(classe);
        classe.setFiliere(this);
        return this;
    }

    public Filiere removeClasse(Classe classe) {
        this.classes.remove(classe);
        classe.setFiliere(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Filiere)) {
            return false;
        }
        return id != null && id.equals(((Filiere) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Filiere{" +
            "id=" + getId() +
            ", nomFiliere='" + getNomFiliere() + "'" +
            "}";
    }
}
