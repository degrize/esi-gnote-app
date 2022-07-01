package com.esi.gnote.service.mapper;

import com.esi.gnote.domain.Salle;
import com.esi.gnote.service.dto.SalleDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Salle} and its DTO {@link SalleDTO}.
 */
@Mapper(componentModel = "spring")
public interface SalleMapper extends EntityMapper<SalleDTO, Salle> {}
