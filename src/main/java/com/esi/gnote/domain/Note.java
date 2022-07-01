package com.esi.gnote.domain;

import com.esi.gnote.domain.enumeration.TypeNote;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Note.
 */
@Entity
@Table(name = "note")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Note implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "note", nullable = false)
    private Double note;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "type_note", nullable = false)
    private TypeNote typeNote;

    @ManyToMany
    @JoinTable(
        name = "rel_note__etudiant",
        joinColumns = @JoinColumn(name = "note_id"),
        inverseJoinColumns = @JoinColumn(name = "etudiant_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(
        value = { "classes", "encadreur", "inspecteurs", "professeurs", "soutenances", "notes", "demandeInspecteurEtudiants" },
        allowSetters = true
    )
    private Set<Etudiant> etudiants = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "rel_note__ec", joinColumns = @JoinColumn(name = "note_id"), inverseJoinColumns = @JoinColumn(name = "ec_id"))
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "uE", "professeurs", "notes", "classes" }, allowSetters = true)
    private Set<EC> eCS = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Note id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getNote() {
        return this.note;
    }

    public Note note(Double note) {
        this.setNote(note);
        return this;
    }

    public void setNote(Double note) {
        this.note = note;
    }

    public TypeNote getTypeNote() {
        return this.typeNote;
    }

    public Note typeNote(TypeNote typeNote) {
        this.setTypeNote(typeNote);
        return this;
    }

    public void setTypeNote(TypeNote typeNote) {
        this.typeNote = typeNote;
    }

    public Set<Etudiant> getEtudiants() {
        return this.etudiants;
    }

    public void setEtudiants(Set<Etudiant> etudiants) {
        this.etudiants = etudiants;
    }

    public Note etudiants(Set<Etudiant> etudiants) {
        this.setEtudiants(etudiants);
        return this;
    }

    public Note addEtudiant(Etudiant etudiant) {
        this.etudiants.add(etudiant);
        etudiant.getNotes().add(this);
        return this;
    }

    public Note removeEtudiant(Etudiant etudiant) {
        this.etudiants.remove(etudiant);
        etudiant.getNotes().remove(this);
        return this;
    }

    public Set<EC> getECS() {
        return this.eCS;
    }

    public void setECS(Set<EC> eCS) {
        this.eCS = eCS;
    }

    public Note eCS(Set<EC> eCS) {
        this.setECS(eCS);
        return this;
    }

    public Note addEC(EC eC) {
        this.eCS.add(eC);
        eC.getNotes().add(this);
        return this;
    }

    public Note removeEC(EC eC) {
        this.eCS.remove(eC);
        eC.getNotes().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Note)) {
            return false;
        }
        return id != null && id.equals(((Note) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Note{" +
            "id=" + getId() +
            ", note=" + getNote() +
            ", typeNote='" + getTypeNote() + "'" +
            "}";
    }
}
