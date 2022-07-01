package com.esi.gnote.service.mapper;

import com.esi.gnote.domain.Bulletin;
import com.esi.gnote.service.dto.BulletinDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Bulletin} and its DTO {@link BulletinDTO}.
 */
@Mapper(componentModel = "spring")
public interface BulletinMapper extends EntityMapper<BulletinDTO, Bulletin> {}
