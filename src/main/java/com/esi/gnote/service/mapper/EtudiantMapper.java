package com.esi.gnote.service.mapper;

import com.esi.gnote.domain.Etudiant;
import com.esi.gnote.service.dto.EtudiantDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Etudiant} and its DTO {@link EtudiantDTO}.
 */
@Mapper(componentModel = "spring")
public interface EtudiantMapper extends EntityMapper<EtudiantDTO, Etudiant> {}
