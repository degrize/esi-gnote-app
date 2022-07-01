package com.esi.gnote.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.esi.gnote.domain.Inspecteur} entity.
 */
@Schema(description = "The Employee entity.")
public class InspecteurDTO implements Serializable {

    private Long id;

    /**
     * The firstname attribute.
     */
    @NotNull
    @Schema(description = "The firstname attribute.", required = true)
    private String nomInspecteur;

    private String prenomInspecteur;

    private String contactInspecteur;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomInspecteur() {
        return nomInspecteur;
    }

    public void setNomInspecteur(String nomInspecteur) {
        this.nomInspecteur = nomInspecteur;
    }

    public String getPrenomInspecteur() {
        return prenomInspecteur;
    }

    public void setPrenomInspecteur(String prenomInspecteur) {
        this.prenomInspecteur = prenomInspecteur;
    }

    public String getContactInspecteur() {
        return contactInspecteur;
    }

    public void setContactInspecteur(String contactInspecteur) {
        this.contactInspecteur = contactInspecteur;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof InspecteurDTO)) {
            return false;
        }

        InspecteurDTO inspecteurDTO = (InspecteurDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, inspecteurDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "InspecteurDTO{" +
            "id=" + getId() +
            ", nomInspecteur='" + getNomInspecteur() + "'" +
            ", prenomInspecteur='" + getPrenomInspecteur() + "'" +
            ", contactInspecteur='" + getContactInspecteur() + "'" +
            "}";
    }
}
