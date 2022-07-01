package com.esi.gnote.service.mapper;

import com.esi.gnote.domain.Inspecteur;
import com.esi.gnote.service.dto.InspecteurDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Inspecteur} and its DTO {@link InspecteurDTO}.
 */
@Mapper(componentModel = "spring")
public interface InspecteurMapper extends EntityMapper<InspecteurDTO, Inspecteur> {}
