package com.esi.gnote.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.esi.gnote.domain.Bulletin} entity.
 */
public class BulletinDTO implements Serializable {

    private Long id;

    @NotNull
    private String signatureDG;

    @NotNull
    private String observation;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSignatureDG() {
        return signatureDG;
    }

    public void setSignatureDG(String signatureDG) {
        this.signatureDG = signatureDG;
    }

    public String getObservation() {
        return observation;
    }

    public void setObservation(String observation) {
        this.observation = observation;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BulletinDTO)) {
            return false;
        }

        BulletinDTO bulletinDTO = (BulletinDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, bulletinDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BulletinDTO{" +
            "id=" + getId() +
            ", signatureDG='" + getSignatureDG() + "'" +
            ", observation='" + getObservation() + "'" +
            "}";
    }
}