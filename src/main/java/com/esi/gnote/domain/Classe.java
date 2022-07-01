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
 * not an ignored comment
 */
@Entity
@Table(name = "classe")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Classe implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "nom_classe", nullable = false)
    private String nomClasse;

    @ManyToOne
    @JsonIgnoreProperties(value = { "etudiant", "uES", "classes" }, allowSetters = true)
    private Filiere filiere;

    @ManyToMany(mappedBy = "classes")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "etudiants", "classes", "eCS", "inspecteurs", "bulletins", "juries" }, allowSetters = true)
    private Set<Professeur> professeurs = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Classe id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomClasse() {
        return this.nomClasse;
    }

    public Classe nomClasse(String nomClasse) {
        this.setNomClasse(nomClasse);
        return this;
    }

    public void setNomClasse(String nomClasse) {
        this.nomClasse = nomClasse;
    }

    public Filiere getFiliere() {
        return this.filiere;
    }

    public void setFiliere(Filiere filiere) {
        this.filiere = filiere;
    }

    public Classe filiere(Filiere filiere) {
        this.setFiliere(filiere);
        return this;
    }

    public Set<Professeur> getProfesseurs() {
        return this.professeurs;
    }

    public void setProfesseurs(Set<Professeur> professeurs) {
        if (this.professeurs != null) {
            this.professeurs.forEach(i -> i.removeClasse(this));
        }
        if (professeurs != null) {
            professeurs.forEach(i -> i.addClasse(this));
        }
        this.professeurs = professeurs;
    }

    public Classe professeurs(Set<Professeur> professeurs) {
        this.setProfesseurs(professeurs);
        return this;
    }

    public Classe addProfesseur(Professeur professeur) {
        this.professeurs.add(professeur);
        professeur.getClasses().add(this);
        return this;
    }

    public Classe removeProfesseur(Professeur professeur) {
        this.professeurs.remove(professeur);
        professeur.getClasses().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Classe)) {
            return false;
        }
        return id != null && id.equals(((Classe) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Classe{" +
            "id=" + getId() +
            ", nomClasse='" + getNomClasse() + "'" +
            "}";
    }
}
