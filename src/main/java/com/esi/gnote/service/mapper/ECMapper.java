package com.esi.gnote.service.mapper;

import com.esi.gnote.domain.EC;
import com.esi.gnote.service.dto.ECDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link EC} and its DTO {@link ECDTO}.
 */
@Mapper(componentModel = "spring")
public interface ECMapper extends EntityMapper<ECDTO, EC> {}
