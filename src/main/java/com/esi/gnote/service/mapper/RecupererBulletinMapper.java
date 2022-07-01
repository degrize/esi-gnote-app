package com.esi.gnote.service.mapper;

import com.esi.gnote.domain.RecupererBulletin;
import com.esi.gnote.service.dto.RecupererBulletinDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link RecupererBulletin} and its DTO {@link RecupererBulletinDTO}.
 */
@Mapper(componentModel = "spring")
public interface RecupererBulletinMapper extends EntityMapper<RecupererBulletinDTO, RecupererBulletin> {}
