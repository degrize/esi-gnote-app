package com.esi.gnote.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.esi.gnote.domain.DemandeInspecteurEtudiant} entity.
 */
public class DemandeInspecteurEtudiantDTO implements Serializable {

    private Long id;

    @NotNull
    private String message;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DemandeInspecteurEtudiantDTO)) {
            return false;
        }

        DemandeInspecteurEtudiantDTO demandeInspecteurEtudiantDTO = (DemandeInspecteurEtudiantDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, demandeInspecteurEtudiantDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DemandeInspecteurEtudiantDTO{" +
            "id=" + getId() +
            ", message='" + getMessage() + "'" +
            "}";
    }
}
