package com.esi.gnote.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.esi.gnote.domain.DemandeInspecteurDE} entity.
 */
public class DemandeInspecteurDEDTO implements Serializable {

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
        if (!(o instanceof DemandeInspecteurDEDTO)) {
            return false;
        }

        DemandeInspecteurDEDTO demandeInspecteurDEDTO = (DemandeInspecteurDEDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, demandeInspecteurDEDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DemandeInspecteurDEDTO{" +
            "id=" + getId() +
            ", message='" + getMessage() + "'" +
            "}";
    }
}
