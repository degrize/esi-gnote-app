package com.esi.gnote.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.esi.gnote.domain.Classe} entity.
 */
@Schema(description = "not an ignored comment")
public class ClasseDTO implements Serializable {

    private Long id;

    @NotNull
    private String nomClasse;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomClasse() {
        return nomClasse;
    }

    public void setNomClasse(String nomClasse) {
        this.nomClasse = nomClasse;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ClasseDTO)) {
            return false;
        }

        ClasseDTO classeDTO = (ClasseDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, classeDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ClasseDTO{" +
            "id=" + getId() +
            ", nomClasse='" + getNomClasse() + "'" +
            "}";
    }
}
