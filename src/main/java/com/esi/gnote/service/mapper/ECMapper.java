package com.esi.gnote.service.mapper;

import com.esi.gnote.domain.EC;
import com.esi.gnote.domain.UE;
import com.esi.gnote.service.dto.ECDTO;
import com.esi.gnote.service.dto.UEDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link EC} and its DTO {@link ECDTO}.
 */
@Mapper(componentModel = "spring")
public interface ECMapper extends EntityMapper<ECDTO, EC> {
    @Mapping(target = "uE", source = "uE", qualifiedByName = "uEId")
    ECDTO toDto(EC s);

    @Named("uEId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    UEDTO toDtoUEId(UE uE);
}
