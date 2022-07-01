package com.esi.gnote.service.mapper;

import com.esi.gnote.domain.Soutenance;
import com.esi.gnote.service.dto.SoutenanceDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Soutenance} and its DTO {@link SoutenanceDTO}.
 */
@Mapper(componentModel = "spring")
public interface SoutenanceMapper extends EntityMapper<SoutenanceDTO, Soutenance> {}
