package com.esi.gnote.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.esi.gnote.domain.UE} entity.
 */
public class UEDTO implements Serializable {

    private Long id;

    private String nomUE;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomUE() {
        return nomUE;
    }

    public void setNomUE(String nomUE) {
        this.nomUE = nomUE;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UEDTO)) {
            return false;
        }

        UEDTO uEDTO = (UEDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, uEDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UEDTO{" +
            "id=" + getId() +
            ", nomUE='" + getNomUE() + "'" +
            "}";
    }
}
