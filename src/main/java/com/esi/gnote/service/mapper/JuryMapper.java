package com.esi.gnote.service.mapper;

import com.esi.gnote.domain.Jury;
import com.esi.gnote.service.dto.JuryDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Jury} and its DTO {@link JuryDTO}.
 */
@Mapper(componentModel = "spring")
public interface JuryMapper extends EntityMapper<JuryDTO, Jury> {}
