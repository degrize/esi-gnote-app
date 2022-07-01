package com.esi.gnote.service.mapper;

import com.esi.gnote.domain.UE;
import com.esi.gnote.service.dto.UEDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link UE} and its DTO {@link UEDTO}.
 */
@Mapper(componentModel = "spring")
public interface UEMapper extends EntityMapper<UEDTO, UE> {}
