package com.esi.gnote.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.esi.gnote.domain.Filiere} entity.
 */
public class FiliereDTO implements Serializable {

    private Long id;

    @NotNull
    private String nomFiliere;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomFiliere() {
        return nomFiliere;
    }

    public void setNomFiliere(String nomFiliere) {
        this.nomFiliere = nomFiliere;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FiliereDTO)) {
            return false;
        }

        FiliereDTO filiereDTO = (FiliereDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, filiereDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "FiliereDTO{" +
            "id=" + getId() +
            ", nomFiliere='" + getNomFiliere() + "'" +
            "}";
    }
}
