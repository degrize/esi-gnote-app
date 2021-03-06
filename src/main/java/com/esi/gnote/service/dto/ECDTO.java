package com.esi.gnote.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.esi.gnote.domain.EC} entity.
 */
public class ECDTO implements Serializable {

    private Long id;

    @NotNull
    private String nomEC;

    @NotNull
    private Integer coeff;

    private UEDTO uE;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomEC() {
        return nomEC;
    }

    public void setNomEC(String nomEC) {
        this.nomEC = nomEC;
    }

    public Integer getCoeff() {
        return coeff;
    }

    public void setCoeff(Integer coeff) {
        this.coeff = coeff;
    }

    public UEDTO getuE() {
        return uE;
    }

    public void setuE(UEDTO uE) {
        this.uE = uE;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ECDTO)) {
            return false;
        }

        ECDTO eCDTO = (ECDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, eCDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ECDTO{" +
            "id=" + getId() +
            ", nomEC='" + getNomEC() + "'" +
            ", coeff=" + getCoeff() +
            ", uE=" + getuE() +
            "}";
    }
}
