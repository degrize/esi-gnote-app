package com.esi.gnote.service.mapper;

import com.esi.gnote.domain.Planche;
import com.esi.gnote.service.dto.PlancheDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Planche} and its DTO {@link PlancheDTO}.
 */
@Mapper(componentModel = "spring")
public interface PlancheMapper extends EntityMapper<PlancheDTO, Planche> {}
