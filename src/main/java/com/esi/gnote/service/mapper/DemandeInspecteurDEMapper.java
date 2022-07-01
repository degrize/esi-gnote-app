package com.esi.gnote.service.mapper;

import com.esi.gnote.domain.DemandeInspecteurDE;
import com.esi.gnote.service.dto.DemandeInspecteurDEDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link DemandeInspecteurDE} and its DTO {@link DemandeInspecteurDEDTO}.
 */
@Mapper(componentModel = "spring")
public interface DemandeInspecteurDEMapper extends EntityMapper<DemandeInspecteurDEDTO, DemandeInspecteurDE> {}
