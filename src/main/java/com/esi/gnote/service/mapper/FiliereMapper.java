package com.esi.gnote.service.mapper;

import com.esi.gnote.domain.Filiere;
import com.esi.gnote.service.dto.FiliereDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Filiere} and its DTO {@link FiliereDTO}.
 */
@Mapper(componentModel = "spring")
public interface FiliereMapper extends EntityMapper<FiliereDTO, Filiere> {}
