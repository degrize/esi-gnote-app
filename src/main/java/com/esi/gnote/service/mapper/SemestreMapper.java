package com.esi.gnote.service.mapper;

import com.esi.gnote.domain.Semestre;
import com.esi.gnote.service.dto.SemestreDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Semestre} and its DTO {@link SemestreDTO}.
 */
@Mapper(componentModel = "spring")
public interface SemestreMapper extends EntityMapper<SemestreDTO, Semestre> {}
