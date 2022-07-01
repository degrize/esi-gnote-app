package com.esi.gnote.service.dto;

import com.esi.gnote.domain.enumeration.TypeSoutenance;
import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.esi.gnote.domain.Soutenance} entity.
 */
public class SoutenanceDTO implements Serializable {

    private Long id;

    @NotNull
    private TypeSoutenance typeSout;

    @NotNull
    private String themeSout;

    @NotNull
    private Double noteSout;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TypeSoutenance getTypeSout() {
        return typeSout;
    }

    public void setTypeSout(TypeSoutenance typeSout) {
        this.typeSout = typeSout;
    }

    public String getThemeSout() {
        return themeSout;
    }

    public void setThemeSout(String themeSout) {
        this.themeSout = themeSout;
    }

    public Double getNoteSout() {
        return noteSout;
    }

    public void setNoteSout(Double noteSout) {
        this.noteSout = noteSout;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SoutenanceDTO)) {
            return false;
        }

        SoutenanceDTO soutenanceDTO = (SoutenanceDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, soutenanceDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SoutenanceDTO{" +
            "id=" + getId() +
            ", typeSout='" + getTypeSout() + "'" +
            ", themeSout='" + getThemeSout() + "'" +
            ", noteSout=" + getNoteSout() +
            "}";
    }
}
